// Core
import React, { useCallback, useEffect } from 'react';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { QueryClient, QueryClientProvider, Hydrate, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DehydratedState } from '@tanstack/react-query';

import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

import { pdfjs } from 'react-pdf';
import { AxiosError } from 'axios';

interface AppProps {
  session: Session | null;
  dehydratedState: DehydratedState;
}

interface CustomToastOptions {
  customToast?: boolean;
  customIcon?: React.ReactNode;
  message?: string;
}

const setupPDFWorker = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
};

const TOAST_ID = 'global-toast';

const createQueryClient = () => {
  const handleMutationSuccess = (response: unknown) => {
    const { data } = response as { data?: CustomToastOptions };
    if (!data) return;

    if (data.customToast) {
      toast.dismiss();
    } else if (data.message) {
      toast.success(data.message, {
        icon: data.customIcon as any,
        id: TOAST_ID,
      });
    }
  };

  const handleMutationError = (error: unknown) => {
    console.error('[GLOBAL ERROR]', error);
    const errorMessage = getErrorMessage(error);

    toast.error(
      `Error: ${errorMessage}\n\nPlease contact support for further assistance`,
      {
        id: TOAST_ID,
        duration: 7000
      }
    );
  };

  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if ((error as AxiosError)?.response?.status === 401) return false;
          return failureCount < 2;
        },
      },
    },
    mutationCache: new MutationCache({
      onSuccess: handleMutationSuccess,
      onError: handleMutationError,
    }),
  });
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : 'Unknown Error';
};

const AppToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 5000,
      error: { duration: 7000 },
      loading: { duration: Infinity },
    }}
  />
);

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggle = useCallback(
    (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme]
  );

  return { colorScheme, toggleColorScheme: toggle };
};

const NeuraCraft: AppType<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(createQueryClient);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(setupPDFWorker, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                colorScheme,
                primaryColor: 'red',
                loader: 'bars',
                components: {
                  Button: { defaultProps: { size: 'md' } },
                  Input: { defaultProps: { size: 'md' } },
                },
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
              <AppToaster />
              <ReactQueryDevtools position="bottom-right" />
            </MantineProvider>
          </ColorSchemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default NeuraCraft;
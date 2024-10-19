import axios from "axios";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import {
  ActionIcon, Button, Container, Group, LoadingOverlay, Stack, Text, TextInput,
  Title, useMantineTheme,
} from "@mantine/core";
import { IconBrandGoogle, IconLogin, IconSpeakerphone } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";

export default function Login({
  setLoginMenuOpened,
}: {
  setLoginMenuOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("");
  const [emailLoginIsLoading, setEmailLoginIsLoading] = useState(false);

  const emailSignIn = async () => {
    const res = await signIn("credentials", {
      email,
      redirect: false,
    });
    if (res?.error) {
      toast.error(`${res.error}\n\nPlease contact support if this persists.`);
    } else if (res?.ok) {
      toast.success("Login successful!");
      setLoginMenuOpened(false);
      window.location.href = "/dashboard";
    }
    setEmailLoginIsLoading(false);
  };

  const { mutate: handleEmailLogin } = useMutation({
    mutationFn: () =>
      axios.post<{
        customToast: boolean;
        emailAllowed: boolean;
        isNewUser: boolean | undefined;
      }>(`/api/auth/isEmailAllowed?email=${email}`),
    onSuccess: (data) => {
      if (!data?.data.emailAllowed) {
        toast.error(
          "You are not authorized to access NeuraCraft without a valid invite. Please join the waitlist or contact support."
        );
        setEmailLoginIsLoading(false);
      } else {
        emailSignIn();
      }
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again later.");
      setEmailLoginIsLoading(false);
      console.error("Email login error:", error);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEmailLoginIsLoading(true);
        handleEmailLogin();
      }}
    >
      <LoadingOverlay
        visible={emailLoginIsLoading}
        overlayBlur={1}
        radius="md"
      />
      <Container p="sm">
        <Stack spacing="sm">
          <Title order={3}>
            Welcome to{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: theme.colors.cyan[5], to: "blue" }}
            >
              NeuraCraft
            </Text>
            !
          </Title>
          <TextInput
            required
            radius="md"
            name="email"
            type="email"
            placeholder="Invite Email"
            disabled={emailLoginIsLoading}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value.trim())}
            error={email.length > 0 && !/^(.+)@(.+)$/.test(email)}
            styles={{
              input: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[0],
              },
            }}
          />
          <Text size="xs" color="dimmed">
            Enter the email address from your invite
          </Text>
          <Group position="apart">
            <Button
              type="submit"
              size="xs"
              variant="outline"
              color="gray"
              radius="xl"
              leftIcon={<IconLogin size={18} stroke={1.5} />}
            >
              Login
            </Button>
            <ActionIcon
              size="md"
              variant="outline"
              color="gray"
              radius="xl"
              onClick={() => signIn("google")}
            >
              <IconBrandGoogle size={18} />
            </ActionIcon>
          </Group>
        </Stack>
      </Container>
    </form>
  );
}

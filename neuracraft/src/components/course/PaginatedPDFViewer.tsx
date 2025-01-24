import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import {
  Stack, Button, Title, ActionIcon, Tooltip, Group, Text, Paper,
  Loader, ScrollArea, Divider, useMantineTheme, Progress
} from '@mantine/core';
import { Download, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useRouter } from 'next/router';

interface CourseMedia {
  publicId: string;
  courseSlug: string;
  courseMediaURL: string;
  mediaName: string;
}

interface PaginatedPDFViewerProps {
  courseMedia: CourseMedia[];
  sidebarWidth: number;
}
// TODO: Add the functionality to save PDF Page states, and not fully reset when switching example pdf 1 is on page 3 then i switch to pdf 2, when switching back to pdf 1 it should be on page 3
const PaginatedPDFViewer: React.FC<PaginatedPDFViewerProps> = ({
  courseMedia = [],
  sidebarWidth
}) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pdfPageMap, setPdfPageMap] = useState<Record<number, number>>({});

  console.log(pdfPageMap);

  useEffect(() => {
    if (router.isReady) {
      const { pdfIndex, page } = router.query;
      let initialPdfIndex = 0;
      let initialPage = 1;

      if (pdfIndex) {
        const index = parseInt(pdfIndex as string, 10);
        if (!isNaN(index) && index >= 0 && index < courseMedia.length) {
          initialPdfIndex = index;
        }
      }
      if (page) {
        const pageNum = parseInt(page as string, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          initialPage = pageNum;
        }
      }

      setCurrentPdfIndex(initialPdfIndex);
      setPageNumber(initialPage);
      setPdfPageMap(prev => ({
        ...prev,
        [initialPdfIndex]: initialPage
      }));
    }
  }, [router.isReady, router.query, courseMedia.length]);

  useEffect(() => {
    setPdfPageMap(prev => ({
      ...prev,
      [currentPdfIndex]: pageNumber
    }));
  }, [currentPdfIndex, pageNumber]);

  useEffect(() => {
    setIsPageLoading(true);
  }, [pageNumber]);

  const updateURL = (newPdfIndex: number, newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        pdfIndex: newPdfIndex,
        page: newPage,
      },
    }, undefined, { shallow: true });
  };

  const handleDocumentLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
    setIsDocumentLoading(false);
  };

  const handlePageLoadSuccess = () => {
    setIsPageLoading(false);
  };

  const navigateToPage = (newPage: number) => {
    if (isDocumentLoading) return;
    const validPage = Math.max(1, Math.min(newPage, numPages));
    setPageNumber(validPage);
    updateURL(currentPdfIndex, validPage);
  };

  const nextPdf = () => {
    if (currentPdfIndex < courseMedia.length - 1) {
      const currentIndex = currentPdfIndex;
      const currentPage = pageNumber;
      const newIndex = currentPdfIndex + 1;

      setPdfPageMap(prev => ({
        ...prev,
        [currentIndex]: currentPage
      }));

      const newPage = pdfPageMap[newIndex] ?? 1;
      setCurrentPdfIndex(newIndex);
      setPageNumber(newPage);
      setIsDocumentLoading(true);
      updateURL(newIndex, newPage);
    }
  };

  const prevPdf = () => {
    if (currentPdfIndex > 0) {
      const currentIndex = currentPdfIndex;
      const currentPage = pageNumber;
      const newIndex = currentPdfIndex - 1;

      setPdfPageMap(prev => ({
        ...prev,
        [currentIndex]: currentPage
      }));

      const newPage = pdfPageMap[newIndex] ?? 1;
      setCurrentPdfIndex(newIndex);
      setPageNumber(newPage);
      setIsDocumentLoading(true);
      updateURL(newIndex, newPage);
    }
  };

  if (!courseMedia || courseMedia.length === 0) {
    return (
      <Paper p="xl" radius="md" shadow="sm" className="w-full text-center">
        <Text size="lg" color="dimmed">No documents available</Text>
      </Paper>
    );
  }

  const currentPdf = courseMedia[currentPdfIndex];

  const renderPage = () => (
    <Page
      key={`page_${currentPdfIndex}_${pageNumber}`}
      pageNumber={pageNumber}
      width={sidebarWidth}
      loading={
        <Stack align="center" spacing="xs" py="md">
          <Loader size="sm" />
        </Stack>
      }
      onLoadSuccess={handlePageLoadSuccess}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      className="mx-auto"
    />
  );

  return (
    <Group spacing="xl" align="flex-start" noWrap className="w-full">
      {/* Compact Chapter List Sidebar */}
      <Paper
        shadow="sm"
        radius="md"
        p="sm"
        style={{ width: sidebarWidth - 150, position: 'sticky', top: 20 }}
      >
        <Title order={5} mb="xs" align="center" size="sm">Chapters</Title>
        <ScrollArea style={{ height: 'calc(100vh - 140px)' }}>
          <Stack spacing={6}>
            {courseMedia.map((media, index) => (
              <Paper
                key={index}
                p="sm"
                radius="sm"
                sx={{
                  cursor: 'pointer',
                  borderLeft: `2px solid ${index === currentPdfIndex ? theme.colors.blue[6] : 'transparent'}`,
                  backgroundColor: index === currentPdfIndex ? theme.colors.blue[0] : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
                  },
                  transition: 'all 150ms ease'
                }}
                onClick={() => {
                  const currentIndex = currentPdfIndex;
                  const currentPage = pageNumber;
                  setPdfPageMap(prev => ({
                    ...prev,
                    [currentIndex]: currentPage
                  }));

                  const newIndex = index;
                  const newPage = pdfPageMap[newIndex] ?? 1;
                  setCurrentPdfIndex(newIndex);
                  setPageNumber(newPage);
                  updateURL(newIndex, newPage);
                }}
              >
                <Text size="xs" weight={500} truncate>
                  {media.mediaName}
                </Text>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      </Paper>

      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 600 }}>
        <Paper shadow="sm" radius="md" p="md">
          <Group position="apart" mb="md">
            <Group spacing="xs">
              <Text size="sm" color="dimmed" weight={500}>
                Document {currentPdfIndex + 1} of {courseMedia.length}
              </Text>
              {(isDocumentLoading || isPageLoading) && <Loader size="sm" />}
            </Group>

            <Title order={4} align="center" truncate style={{ maxWidth: 400 }}>
              {currentPdf?.mediaName}
            </Title>

            <Group spacing="xs">
              <Tooltip label="Download" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  component="a"
                  href={currentPdf?.courseMediaURL}
                  download
                >
                  <Download size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Fullscreen" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  onClick={() => window.open(currentPdf?.courseMediaURL, '_blank')}
                >
                  <Maximize2 size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <Divider mb="md" />

          <div style={{ minHeight: 500, position: 'relative' }}>
            <Document
              file={currentPdf?.courseMediaURL}
              onLoadSuccess={handleDocumentLoadSuccess}
              loading={
                <Stack align="center" justify="center" style={{ height: 500 }}>
                  <Loader variant="dots" size="lg" />
                  <Text mt="sm" color="dimmed">Loading document...</Text>
                </Stack>
              }
              error={
                <Stack align="center" justify="center" style={{ height: 500 }}>
                  <Text color="red" weight={600}>Failed to load PDF</Text>
                  <Text color="dimmed" size="sm">Please try again or download the file</Text>
                </Stack>
              }
            >
              {renderPage()}
            </Document>
          </div>

          <Stack spacing="sm" mt="md">
            <Group position="center" spacing="xs">
              <Button
                variant="outline"
                leftIcon={<ChevronLeft size={16} />}
                onClick={prevPdf}
                disabled={currentPdfIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                rightIcon={<ChevronRight size={16} />}
                onClick={nextPdf}
                disabled={currentPdfIndex === courseMedia.length - 1}
              >
                Next
              </Button>
            </Group>

            <Group position="center" spacing="xs">
              <Button.Group>
                <Button
                  variant="default"
                  px="xs"
                  onClick={() => navigateToPage(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="default" px="xl" disabled>
                  Page {pageNumber} of {numPages}
                </Button>
                <Button
                  variant="default"
                  px="xs"
                  onClick={() => navigateToPage(pageNumber + 1)}
                  disabled={pageNumber >= numPages}
                >
                  <ChevronRight size={16} />
                </Button>
              </Button.Group>
            </Group>

            {numPages > 1 && (
              <Progress
                value={(pageNumber / numPages) * 100}
                size="sm"
                mt="xs"
                styles={{
                  bar: { transition: 'width 200ms ease' }
                }}
              />
            )}
          </Stack>
        </Paper>
      </div>
    </Group>
  );
};

export default PaginatedPDFViewer;
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Stack, Button, Title, ActionIcon, Tooltip, Group, Text, Paper, Loader, ScrollArea, Divider } from '@mantine/core';
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

const PaginatedPDFViewer: React.FC<PaginatedPDFViewerProps> = ({
  courseMedia = [],
  sidebarWidth
}) => {
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);
  const [currentPdfIndex, setCurrentPdfIndex] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const { pdfIndex, page } = router.query;
      if (pdfIndex) {
        const index = parseInt(pdfIndex as string, 10);
        if (!isNaN(index) && index >= 0 && index < courseMedia.length) {
          setCurrentPdfIndex(index);
        }
      }
      if (page) {
        const pageNum = parseInt(page as string, 10);
        if (!isNaN(pageNum) && pageNum > 0) {
          setPageNumber(pageNum);
        }
      }
    }
  }, [router.isReady, router.query, courseMedia.length]);

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

  const handleDocumentLoadError = () => {
    setIsDocumentLoading(false);
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
      const newIndex = currentPdfIndex + 1;
      setCurrentPdfIndex(newIndex);
      setPageNumber(1);
      setIsDocumentLoading(true);
      setIsPageLoading(true);
    }
  };

  const prevPdf = () => {
    if (currentPdfIndex > 0) {
      const newIndex = currentPdfIndex - 1;
      setCurrentPdfIndex(newIndex);
      setPageNumber(1);
      setIsDocumentLoading(true);
      setIsPageLoading(true);
    }
  };

  if (!courseMedia || courseMedia.length === 0) {
    return (
      <Paper className="w-full p-8 text-center">
        <Text size="lg" color="dimmed">No PDF documents available</Text>
      </Paper>
    );
  }

  const currentPdf = courseMedia[currentPdfIndex];

  const renderPage = () => {
    return (
      <Page
        key={`page_${currentPdfIndex}_${pageNumber}`}
        pageNumber={pageNumber}
        width={sidebarWidth}
        className="flex justify-center"
        renderAnnotationLayer={false}
        renderTextLayer={false}
        loading={<Stack align="center" spacing="xs" className="py-4"> <Loader size="sm" /> </Stack>}
        onLoadSuccess={handlePageLoadSuccess}
      />
    );
  };

  return (
    <Group className="w-full" spacing={16} align="flex-start">
      <ScrollArea style={{ width: sidebarWidth }} type="scroll" scrollbarSize={5}>
        <Paper shadow="sm" radius="md" className="w-full p-4">
          <Title order={4} className="text-center text-lg font-semibold mb-4">Chapter List</Title>
          <Stack spacing={8} className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {courseMedia.map((media, index) => (
              <Paper
                key={index}
                padding="md"
                radius="md"
                className={`cursor-pointer ${index === currentPdfIndex ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  setCurrentPdfIndex(index);
                  setPageNumber(1);
                  updateURL(index, 1);
                }}
              >
                <Text size="sm" weight={500}> {media.mediaName} </Text>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </ScrollArea>

      <Paper shadow="sm" radius="md" className="w-full p-4 flex-grow">
        <Group position="apart" className="mb-4 px-2">
          <Group spacing={8}>
            <Text size="sm" color="dimmed" className="font-medium"> Document {currentPdfIndex + 1} of {courseMedia.length} </Text>
            {(isDocumentLoading || isPageLoading) && <Loader size="sm" />}
          </Group>
          <Title order={3} className="text-center text-lg font-semibold"> {currentPdf?.mediaName} </Title>
          <Group spacing={8}>
            <Tooltip label="Download PDF" withArrow position="left">
              <ActionIcon variant="light" color="blue" className="rounded-lg hover:bg-blue-50" component="a" href={currentPdf?.courseMediaURL} target="_blank" download>
                <Download size={40} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Full Screen" withArrow position="left">
              <ActionIcon variant="light" color="blue" className="rounded-lg hover:bg-blue-50" onClick={() => window.open(currentPdf?.courseMediaURL, '_blank')}>
                <Maximize2 size={40} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Divider my="sm" />

        <Paper shadow="xs" radius="md" className="mb-4 overflow-hidden">
          <Document
            file={currentPdf?.courseMediaURL}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={<Stack align="center" spacing="md" className="py-12"> <Loader size="lg" variant="dots" /> <Text size="sm" color="dimmed">Loading document...</Text> </Stack>}
            error={<Stack align="center" spacing="xs" className="py-12"> <Text color="red" size="lg">Unable to load PDF</Text> <Text size="sm" color="dimmed">Please try again or download the document</Text> </Stack>}
          >
            {renderPage()}
          </Document>
        </Paper>

        <Stack spacing={4}>
          <Group position="center" spacing={8}>
            <Button variant="light" size="sm" onClick={prevPdf} disabled={currentPdfIndex === 0 || isDocumentLoading} leftIcon={<ChevronLeft size={16} />} className="hover:bg-gray-50"> Previous Document </Button>
            <Button variant="light" size="sm" onClick={nextPdf} disabled={currentPdfIndex === courseMedia.length - 1 || isDocumentLoading} rightIcon={<ChevronRight size={16} />} className="hover:bg-gray-50"> Next Document </Button>
          </Group>

          <Group position="center" spacing={8}>
            <Button.Group>
              <Button variant="default" size="xs" onClick={() => navigateToPage(pageNumber - 1)} disabled={pageNumber <= 1 || isDocumentLoading} className="hover:bg-gray-50">
                <ChevronLeft size={14} />
              </Button>
              <Button variant="default" size="xs" className="select-none" disabled> Page {pageNumber} of {numPages} </Button>
              <Button variant="default" size="xs" onClick={() => navigateToPage(pageNumber + 1)} disabled={pageNumber >= numPages || isDocumentLoading} className="hover:bg-gray-50">
                <ChevronRight size={14} />
              </Button>
            </Button.Group>
          </Group>
        </Stack>
      </Paper>
    </Group>
  );
};

export default PaginatedPDFViewer;
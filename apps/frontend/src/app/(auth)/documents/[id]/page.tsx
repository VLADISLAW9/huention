import { Box } from '@mantine/core';

import { useDocumentPage } from './hooks';

interface DocumentPageProps {
  params: {
    id: string;
  };
}

const DocumentPage = ({ params }: DocumentPageProps) => {
  const { state, functions } = useDocumentPage(+params.id);

  return (
    <Box pt='xl' px={200}>
      Document
    </Box>
  );
};

export default DocumentPage;

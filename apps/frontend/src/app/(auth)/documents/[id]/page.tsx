import { useDocumentPage } from './hooks';

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { state, functions } = useDocumentPage(+params.id);

  return <div>Document</div>;
};

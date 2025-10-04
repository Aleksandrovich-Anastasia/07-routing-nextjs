import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NotesClient from '../notes/filter/[...slug]/Notes.client';

const NotesPage = async () => {
  const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
  queryKey: ['notes'],
  queryFn: () => fetchNotes(), 
});


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;

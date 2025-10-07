import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';
import SidebarNotes from '../@sidebar/SidebarNotes';
import css from './NotesPage.module.css';

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;

  const tag = resolvedParams.slug?.[0] !== 'All' ? resolvedParams.slug?.[0] : undefined;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag }],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <div className={css.pageContainer}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.mainContent}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag={tag} />
        </HydrationBoundary>
      </main>
    </div>
  );
}

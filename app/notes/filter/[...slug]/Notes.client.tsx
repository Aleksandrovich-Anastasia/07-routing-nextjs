'use client';

import { useState } from 'react';
import type { Note } from '@/types/note';
import type { FetchNotesResponse } from '@/types/note';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import SidebarNotes from '../@sidebar/SidebarNotes';
import css from './NotesPage.module.css';


interface NotesClientProps {
  dehydratedState?: DehydratedState | null;
  tag?: string;
}

// --- Внутрішній компонент ---
const NotesClientInner = ({ tag }: { tag?: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
  queryKey: ['notes', tag, debouncedSearch],
  queryFn: () => fetchNotes({ tag, search: debouncedSearch }),
});


  const filteredNotes = data?.notes?.filter((note: Note) => {
  const matchesTag = tag && tag !== 'All' ? note.tag === tag : true;
  const matchesSearch = debouncedSearch
    ? note.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    : true;
  return matchesTag && matchesSearch;
}) ?? []; 

  return (
    <div className={css.app}>
      <main className={css.main}>
        <header className={css.toolbar}>
          <SearchBox value={searchTerm} onChange={setSearchTerm} />
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>

        {isLoading && <Loader />}
        {error && <p>Error loading notes: {error.message}</p>}

        {filteredNotes && filteredNotes.length > 0 ? (
          <NoteList notes={filteredNotes} />
        ) : (
          <p>No notes found.</p>
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </div>
  );
};

// --- Основний компонент ---
export default function NotesClient({ dehydratedState, tag }: NotesClientProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState ?? undefined}>
        <NotesClientInner tag={tag} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

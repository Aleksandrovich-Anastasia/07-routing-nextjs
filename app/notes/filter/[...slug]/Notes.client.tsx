"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import type { Note } from '@/types/note';

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

interface NotesListClientProps {
  tag?: string;
}

export default function NotesListClient({ tag }: NotesListClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error } =
    useQuery<FetchNotesResponse, Error>({
      queryKey: ["notes", page, debouncedSearch, tag],
      queryFn: () =>
        fetchNotes({ page, perPage: 5, search: debouncedSearch, tag }),
    });

  const mutation = useMutation({
    mutationFn: (note: Partial<Note>) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <SearchBox value={search} onChange={val => { setSearch(val); setPage(1); }} />

      <button onClick={() => setIsModalOpen(true)} className="mb-4 px-3 py-1 border rounded">
        + Add note
      </button>

      <NoteList notes={data?.notes ?? []} />

      <Pagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />

      {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
       <NoteForm
         onSubmit={(note) => mutation.mutate(note)}
         isLoading={mutation.isPending}
         onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      )}
    </div>
  );
}

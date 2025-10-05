"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

interface NotesListClientProps {
  tag?: string; // Проп для фільтрації по тегу
}

export default function NotesListClient({ tag }: NotesListClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Дебаунс для пошуку
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

 const { data, isLoading, isError, error } = useQuery<FetchNotesResponse, Error>({
  queryKey: ["notes", page, debouncedSearch, tag],
  queryFn: () => fetchNotes({ page, perPage: 5, search: debouncedSearch, tag }),
});


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      {/* Пошук */}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search notes..."
        className="border px-2 py-1 mb-4"
      />

      {/* Список нотаток */}
      <ul>
        {data?.notes.map((note) => (
          <li key={note.id} className="border-b py-2">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            {note.tag && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {note.tag}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Пагінація */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {data?.totalPages ?? 1}
        </span>
        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

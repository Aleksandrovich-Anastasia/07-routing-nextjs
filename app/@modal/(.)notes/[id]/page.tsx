'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

interface NoteModalProps {
  params: { id: string };
}

export default function NoteModal({ params }: NoteModalProps) {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNoteById(params.id).then(setNote);
  }, [params.id]);

  if (!note) return <div>Loading...</div>;

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </div>
  );
}

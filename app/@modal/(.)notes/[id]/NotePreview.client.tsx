'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNoteById(id).then(setNote);
  }, [id]);

  if (!note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}

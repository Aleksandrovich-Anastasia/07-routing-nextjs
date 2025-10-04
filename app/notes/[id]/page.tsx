// app/notes/[id]/page.tsx
'use client';

import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NoteDetailsModalProps {
  id: string;
}

export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryClient] = useState(() => new QueryClient());

  const from = searchParams.get('from') || '/notes/filter/All';

  const handleClose = () => {
    router.push(from);
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} onClose={handleClose} />
    </HydrationBoundary>
  );
}

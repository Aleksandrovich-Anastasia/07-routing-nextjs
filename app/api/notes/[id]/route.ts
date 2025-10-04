import { NextResponse } from 'next/server';

const BASE_URL = 'https://next-docs-9f0504b0a741.herokuapp.com/api/notes';

// GET /api/notes/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${BASE_URL}/${params.id}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}

// DELETE /api/notes/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`${BASE_URL}/${params.id}`, { method: 'DELETE' });
  const data = await res.json();
  return NextResponse.json(data);
}

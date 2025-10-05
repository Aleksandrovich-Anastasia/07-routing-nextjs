import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://next-docs-9f0504b0a741.herokuapp.com/';
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? '';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const response = await api.post<Note>('/', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/${id}`);
  return response.data;
};

import axios from 'axios';
import type { Note } from '../types/note';

const LOCAL_API = '/api/notes'; // тепер звертаємось тільки сюди

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(LOCAL_API, { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${LOCAL_API}/${id}`);
  return response.data;
};

export const createNote = async (note: Partial<Note>): Promise<Note> => {
  const response = await axios.post<Note>(LOCAL_API, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${LOCAL_API}/${id}`);
  return response.data;
};

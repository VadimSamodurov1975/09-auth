import { nextServer } from "./api";
import type { Note, CreateNote } from "@/types/note";
import { User } from "@/types/user";

export type FetchNotesProps = {
  search?: string;
  page?: number;
  tag?: string;
};

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type ServerResponse = {
  success: boolean;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: CreateNote) => {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (info: RegisterRequest) => {
  const res = await nextServer.post<User>("auth/register", info);
  return res.data;
};

export const login = async (info: LoginRequest) => {
  const res = await nextServer.post<User>("auth/login", info);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer<ServerResponse>("auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer<User>("auth/me");
  return res.data;
};

export const logOut = async () => {
  const res = await nextServer.post<ServerResponse>("auth/logout");
  return res.data;
};
import axios from "axios";

const API = "http://localhost:3000/books";

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  sinopse: string;
  qtdPaginas: number;
  anoLancamento: number;
  notaMedia: number;
  imagem?: string | null;
  criadoPor?: string;
}

export async function getBooks(): Promise<Book[]> {
  const res = await axios.get<Book[]>(API);
  return res.data;
}

export async function createBook(book: Omit<Book, "id" | "notaMedia">, token: string) {
  await axios.post(API, book, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateBook(id: number, book: Partial<Book>, token: string) {
  await axios.put(`${API}/${id}`, book, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteBook(id: number, token: string) {
  await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

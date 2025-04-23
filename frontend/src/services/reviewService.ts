import axios from "axios";

const API = "http://localhost:8043/reviews";

export interface Review {
  id: number;
  titulo: string;
  conteudo: string;
  nota: number;
  criadoPor: string;
  livroId: number;
}

export interface CreateReviewDTO {
  titulo: string;
  conteudo: string;
  nota: number;
  livroId: number;
}

export async function getReviewsByBook(bookId: number): Promise<Review[]> {
  const res = await axios.get<Review[]>(`${API}/book/${bookId}`);
  return res.data;
}

export async function createReview(data: CreateReviewDTO): Promise<Review> {
  const token = localStorage.getItem("bookreview_auth");
  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  const { token: jwt } = JSON.parse(token);

  const res = await axios.post<Review>(API, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res.data;
}

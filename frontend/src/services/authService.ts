import axios from "axios";
import { decodeToken } from "../utils/jwtDecode";

const API = "http://localhost:8041/auth";

interface LoginResponse {
  token: string;
}

export async function loginUser(credentials: { login: string; password: string }) {
  const res = await axios.post<LoginResponse>(`${API}/login`, credentials);
  const token = res.data.token;

  const decoded = decodeToken(token);
  if (!decoded) throw new Error("Token inválido");

  return {
    token,
    login: decoded.login,
    role: decoded.role,
  };
}

export async function registerUser(data: {
  nome: string;
  email: string;
  login: string;
  senha: string;
}): Promise<void> {
  await axios.post(`${API}/register`, data);
}

// utils/jwtDecode.ts
export function decodeToken(token: string): { login: string; role: string } | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      login: decoded.sub,
      role: decoded.role,
    };
  } catch (e) {
    console.error("Erro ao decodificar token", e);
    return null;
  }
}

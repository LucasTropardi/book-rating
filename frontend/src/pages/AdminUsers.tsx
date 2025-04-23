/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface User {
  id: number;
  nome: string;
  login: string;
  role: "USER" | "ADMIN";
  ativo: boolean;
}

export default function AdminUsers() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await axios.get<User[]>("http://localhost:8042/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarRole(id: number, role: "USER" | "ADMIN") {
    try {
      await axios.put(
        "http://localhost:8042/users/role",
        { id, role },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar a role do usuário.");
    }
  }

  async function desativarUsuario(id: number) {
    if (!confirm("Deseja realmente desativar este usuário?")) return;
    try {
      await axios.delete(`http://localhost:8042/users/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Erro ao desativar o usuário.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Administração de Usuários</h1>

      {erro && <p className="text-red-600 mb-4">{erro}</p>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Login</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Ativo</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.nome}</td>
                <td className="p-2 border">{u.login}</td>
                <td className="p-2 border">
                  <select
                    className="border rounded px-2 py-1"
                    value={u.role}
                    onChange={(e) =>
                      atualizarRole(u.id, e.target.value as "USER" | "ADMIN")
                    }
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="p-2 border text-center">{u.ativo ? "Sim" : "Não"}</td>
                <td className="p-2 border text-center">
                  {u.ativo && (
                    <button
                      onClick={() => desativarUsuario(u.id)}
                      className="text-red-600 hover:underline"
                    >
                      Desativar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

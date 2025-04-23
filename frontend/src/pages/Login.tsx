import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    login: "",
    senha: ""
  })
  const [erro, setErro] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    try {
      const data = await loginUser({ ...form, password: form.senha })
      login(data) // salva no contexto e localStorage
      navigate("/") // redireciona pra home
    } catch (err) {
      console.error(err)
      setErro("Login inválido. Verifique os dados.")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="login"
          placeholder="Usuário"
          value={form.login}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm mt-4">
        Não tem conta?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  )
}

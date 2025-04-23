/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: "",
    email: "",
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
      await registerUser(form)
      navigate("/login")
    } catch (err: any) {
      setErro("Erro ao cadastrar. Verifique os dados.")
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Criar conta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
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
          Cadastrar
        </button>
      </form>

      <p className="text-sm mt-4">
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Faça login
        </a>
      </p>
    </div>
  )
}

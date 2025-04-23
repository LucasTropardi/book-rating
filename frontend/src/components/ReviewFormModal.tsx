import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createReview } from "../services/reviewService";
import { StarInput } from "./StarInput";

interface ReviewFormModalProps {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReviewFormModal({
  bookId,
  isOpen,
  onClose,
  onSuccess,
}: ReviewFormModalProps) {
  const { isLoggedIn } = useAuth();
  const [form, setForm] = useState({
    titulo: "",
    conteudo: "",
    nota: 5,
  });

  const [erro, setErro] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!isLoggedIn) {
      setErro("Você precisa estar logado para avaliar.");
      return;
    }

    try {
      await createReview({
        titulo: form.titulo,
        conteudo: form.conteudo,
        nota: Number(form.nota),
        livroId: bookId,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setErro("Erro ao enviar avaliação. Tente novamente.");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Nova Avaliação</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="titulo"
            placeholder="Título da sua avaliação"
            value={form.titulo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />

          <textarea
            name="conteudo"
            placeholder="Escreva sua opinião..."
            value={form.conteudo}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />

          <div>
            <label className="block mb-1 text-sm font-larger">Nota:</label>
            <StarInput
              value={form.nota}
              onChange={(nota) => setForm((prev) => ({ ...prev, nota }))}
            />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
          >
            Enviar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
}

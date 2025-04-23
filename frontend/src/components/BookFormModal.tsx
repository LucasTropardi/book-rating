/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import { Book, createBook, updateBook } from "../services/bookService";
import { useAuth } from "../context/AuthContext";

interface BookFormModalProps {
  book: Book | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookFormModal({ book, onClose, onSuccess }: BookFormModalProps) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    sinopse: "",
    anoLancamento: 2024,
    paginas: 100,
    imagem: "" as string | null,
  });

  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setForm({
        titulo: book.titulo,
        autor: book.autor,
        sinopse: book.sinopse,
        anoLancamento: book.anoLancamento,
        paginas: book.qtdPaginas,
        imagem: book.imagem || null,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "paginas" || name === "anoLancamento" ? Number(value) : value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imagem: (reader.result as string).split(",")[1] }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    try {
      const token = user?.token!;
      if (book) {
        await updateBook(book.id, form, token);
      } else {
        await createBook({ ...form, qtdPaginas: form.paginas }, token);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar livro.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{book ? "Editar Livro" : "Novo Livro"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="autor"
            placeholder="Autor"
            value={form.autor}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="sinopse"
            placeholder="Sinopse"
            rows={4}
            value={form.sinopse}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex gap-4">
            <input
              name="anoLancamento"
              type="number"
              min={1000}
              value={form.anoLancamento}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
              placeholder="Ano"
              required
            />
            <input
              name="paginas"
              type="number"
              min={1}
              value={form.paginas}
              onChange={handleChange}
              className="w-1/2 border p-2 rounded"
              placeholder="Páginas"
              required
            />
          </div>

          <input type="file" accept="image/*" onChange={handleFile} className="block text-sm" />

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {book ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

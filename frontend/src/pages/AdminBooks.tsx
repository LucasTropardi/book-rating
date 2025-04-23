/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react";
import { Book, getBooks, deleteBook } from "../services/bookService";
import { BookFormModal } from "../components/BookFormModal"; 
import { useAuth } from "../context/AuthContext";

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selected, setSelected] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const loadBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja realmente excluir este livro?")) {
      await deleteBook(id, user?.token!);
      loadBooks();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Gerenciar Livros</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
        >
          Novo Livro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border rounded p-4 shadow-sm">
            <h2 className="font-bold text-lg mb-1">{book.titulo}</h2>
            <p className="text-sm italic text-gray-600">{book.autor}</p>
            <p className="text-sm text-gray-700 mt-2">{book.sinopse.slice(0, 100)}...</p>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => {
                  setSelected(book);
                  setModalOpen(true);
                }}
              >
                Editar
              </button>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => handleDelete(book.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <BookFormModal
          book={selected}
          onClose={() => {
            setModalOpen(false);
            setSelected(null);
          }}
          onSuccess={() => {
            setModalOpen(false);
            loadBooks();
          }}
        />
      )}
    </div>
  );
}

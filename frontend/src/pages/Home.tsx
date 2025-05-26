import { useEffect, useState } from "react";
import { getBooks, Book } from "../services/bookService";
import { BookCard } from "../components/BookCard";
import { BookDetailsModal } from "../components/BookDetailsModal";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    getBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error("Erro ao carregar livros", err));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 Ranking de Livros</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {books.length === 0 ? (
          <p className="text-gray-500">Nenhum livro encontrado</p>
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              nome={book.titulo}
              autor={book.autor}
              sinopse={book.sinopse}
              imagem={book.imagem}
              onClick={() => {
                setSelectedBook(book);
                setIsModalOpen(true);
              }}
            />
          ))
        )}
      </div>

      {selectedBook && (
        <BookDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookId={selectedBook.id}
          imagem={selectedBook.imagem}
          nome={selectedBook.titulo}
          autor={selectedBook.autor}
          anoLancamento={selectedBook.anoLancamento}
          sinopse={selectedBook.sinopse}
        />
      )}
    </div>
  );
}

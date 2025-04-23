/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { StarRating } from "./StarRating";
import { getReviewsByBook, Review } from "../services/reviewService";
import { ReviewFormModal } from "./ReviewFormModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
  imagem?: string | null;
  nome: string;
  autor: string;
  anoLancamento: number;
  sinopse: string;
}

export function BookDetailsModal({
  isOpen,
  onClose,
  bookId,
  imagem,
  nome,
  autor,
  anoLancamento,
  sinopse,
}: BookDetailsModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const fetchReviews = () => {
    setLoading(true);
    getReviewsByBook(bookId)
      .then(setReviews)
      .catch((err) => console.error("Erro ao buscar avaliações", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isOpen) fetchReviews();
  }, [isOpen, bookId]);

  const media =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.nota, 0) / reviews.length
      : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg overflow-y-auto max-h-[90vh] relative">
        <button
          className="absolute top-4 right-6 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {imagem && (
          <img
            src={imagem}
            alt={`Capa de ${nome}`}
            className="w-full max-h-80 object-contain rounded mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-2">{nome}</h2>

        {!loading && reviews.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold">Média das avaliações:</p>
            <StarRating nota={media} />
          </div>
        )}

        <p className="italic text-gray-700 mb-1">por {autor}</p>
        <p className="text-sm text-gray-500 mb-1">Lançamento • {anoLancamento}</p>
        <p className="mb-4 text-gray-600">{sinopse}</p>

        <button
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          onClick={() => {
            if (isLoggedIn) {
              setShowReviewModal(true);
            } else {
              navigate("/login");
            }
          }}
        >
          Adicionar Avaliação
        </button>

        <h3 className="text-lg font-semibold mb-2">📖 Avaliações</h3>

        {loading ? (
          <p className="text-gray-500">Carregando avaliações...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">Nenhuma avaliação ainda.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((rev) => (
              <li key={rev.id} className="border rounded p-3 bg-gray-50">
                <strong className="block">{rev.titulo}</strong>
                <p className="text-sm text-gray-700 mb-1">{rev.conteudo}</p>
                <div className="flex items-center justify-between text-sm">
                  <StarRating nota={rev.nota} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showReviewModal && (
        <ReviewFormModal
          bookId={bookId}
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            setShowReviewModal(false);
            fetchReviews();
          }}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getReviewsByBook } from "../services/reviewService";
import { StarRating } from "./StarRating";

interface BookCardProps {
  id: number;
  nome: string;
  autor: string;
  sinopse: string;
  imagem?: string | null;
  onClick: () => void;
}

export function BookCard({ id, nome, autor, sinopse, imagem, onClick }: BookCardProps) {
  const [notaMedia, setNotaMedia] = useState(0);

  useEffect(() => {
    getReviewsByBook(id).then((reviews) => {
      const media =
        reviews.length > 0
          ? reviews.reduce((acc, cur) => acc + cur.nota, 0) / reviews.length
          : 0;
      setNotaMedia(Number(media.toFixed(1)));
    });
  }, [id]);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
      {imagem && (
        <img
          src={imagem}
          alt={`Capa de ${nome}`}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-1">{nome}</h2>
      <p className="text-sm text-gray-700 mb-1 italic">por {autor}</p>
      <p className="text-sm text-gray-600 mb-2">{sinopse.slice(0, 100)}...</p>

      <StarRating nota={notaMedia} />

      <button
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        onClick={onClick}
      >
        Ver detalhes
      </button>
    </div>
  );
}

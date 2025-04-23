interface StarRatingProps {
  nota: number; // de 0 a 5 (inclusive frações)
}

export function StarRating({ nota }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= nota ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-500">({nota.toFixed(1)})</span>
    </div>
  );
}

interface StarInputProps {
  value: number;
  onChange: (nota: number) => void;
}

export function StarInput({ value, onChange }: StarInputProps) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="text-4xl focus:outline-none transition"
        >
          <span className={star <= value ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        </button>
      ))}
      <span className="ml-3 text-base text-gray-600">{value}/5</span>
    </div>
  );
}

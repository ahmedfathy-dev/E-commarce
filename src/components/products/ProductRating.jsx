export default function ProductRating({ value = 0 }) {
  const rating = Number(value);
  const safe = Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 0;
  const filled = Math.round(safe);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-[11px] leading-none text-neutral-900" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>{index < filled ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="text-[11px] text-neutral-400">{safe.toFixed(1)}</span>
    </div>
  );
}

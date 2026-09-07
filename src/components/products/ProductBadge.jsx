export default function ProductBadge({ children }) {
  if (!children) return null;

  return (
    <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-neutral-800">
      {children}
    </span>
  );
}

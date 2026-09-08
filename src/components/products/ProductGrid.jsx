import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], className = "", loading = false, error = "" }) {
  const items = Array.isArray(products) ? products.filter(Boolean) : [];

  if (loading) {
    return <p className="py-16 text-center text-sm text-neutral-400">Loading products...</p>;
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-neutral-500">{error}</p>;
  }

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-neutral-400">No products found.</p>
    );
  }

  return (
    <div className={`grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 ${className}`}>
      {items.map((product, index) => (
        <ProductCard key={product.id ?? index} product={product} index={index} />
      ))}
    </div>
  );
}

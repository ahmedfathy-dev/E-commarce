export const categories = [
  { id: "jackets", name: "Jackets", image: "/ss.jpg", line: "Architecture in cloth" },
  { id: "hoodies", name: "Hoodies", image: "/k.jpg", line: "Soft structure, daily ease" },
  { id: "pants", name: "Pants", image: "/d.jpg", line: "A longer, quieter line" },
  { id: "outerwear", name: "Outerwear", image: "/a.jpg", line: "Weather, without noise" },
  { id: "accessories", name: "Accessories", image: "/pp.jpg", line: "The last precise note" },
];

export const products = [
  {
    id: 1,
    name: "Aurora Silver",
    description: "Reflective puffer with a high-shine city finish.",
    price: 999.99,
    oldPrice: 1299.99,
    discount: "-23%",
    image: "/ssss.png",
    category: "jackets",
    featured: true,
    rating: 4.8,
    colors: ["#f4f4f4", "#111111", "#cfd8dc", "#e8dcc8"],
  },
  {
    id: 2,
    name: "Orbit Silver",
    description: "High-gloss cropped puffer with insulated lining.",
    price: 1199.99,
    oldPrice: 1499.99,
    discount: "-20%",
    image: "/ffff.png",
    category: "jackets",
    rating: 4.6,
    colors: ["#f7f7f7", "#1a1a1a", "#d7dee4", "#f0e4b8"],
  },
  {
    id: 3,
    name: "Stealth Black",
    description: "Heavy shield puffer with a quiet, architectural line.",
    price: 1199.99,
    oldPrice: 1599.99,
    discount: "-25%",
    image: "/z.png",
    category: "outerwear",
    rating: 5.0,
    colors: ["#111111", "#f5f5f5", "#9aa7b2", "#e8dcc8"],
  },
  {
    id: 4,
    name: "Night Runner",
    description: "Lightweight street layer with a clean tapered hem.",
    price: 189.99,
    oldPrice: 249.99,
    discount: "-24%",
    image: "/xxxxx.png",
    category: "hoodies",
    rating: 4.2,
    colors: ["#ffffff", "#222222", "#b8c9d4", "#f0e4b8"],
  },
  {
    id: 5,
    name: "City Minimal",
    description: "Everyday tailored jacket in a matte architectural cut.",
    price: 249.99,
    oldPrice: 320.0,
    discount: "-22%",
    image: "/aa.jpg",
    category: "jackets",
    rating: 4.9,
    colors: ["#ececec", "#111111", "#c9d6df", "#e7d7b8"],
  },
  {
    id: 6,
    name: "Soft Peak Hoodie",
    description: "Oversized cotton hoodie with a quiet drape.",
    price: 89.99,
    oldPrice: 120.0,
    discount: "-25%",
    image: "/aaaa.png",
    category: "hoodies",
    rating: 5.0,
    colors: ["#ffffff", "#111111", "#c5d4de", "#f3e2b0"],
  },
  {
    id: 7,
    name: "Urban Jacket",
    description: "Structured urban jacket with utility pockets.",
    price: 120.0,
    oldPrice: 180.0,
    discount: "-30%",
    image: "/gg.jpg",
    category: "jackets",
    rating: 4.7,
    colors: ["#f6f6f6", "#1c1c1c", "#adc0cc", "#efe0b6"],
  },
  {
    id: 8,
    name: "Street Pants",
    description: "Tapered street pants with a soft cropped length.",
    price: 70.0,
    oldPrice: 100.0,
    discount: "-20%",
    image: "/z.png",
    category: "pants",
    rating: 4.8,
    colors: ["#ffffff", "#111111", "#c9d6df", "#f3e2b0"],
  },
  {
    id: 9,
    name: "Winter Shield",
    description: "Long outerwear coat with a hidden placket.",
    price: 340.0,
    oldPrice: 420.0,
    discount: "-19%",
    image: "/bgg.jpg",
    category: "outerwear",
    rating: 4.5,
    colors: ["#111111", "#f4f4f4", "#9eacb6", "#e8dcc8"],
  },
  {
    id: 10,
    name: "Mono Cap",
    description: "Minimal accessory cap in dense cotton twill.",
    price: 39.99,
    oldPrice: 55.0,
    discount: "-27%",
    image: "/ffff.png",
    category: "accessories",
    rating: 4.4,
    colors: ["#ffffff", "#111111", "#b9c8d3", "#f0e4b8"],
  },
  {
    id: 11,
    name: "Line Trousers",
    description: "Straight-leg trousers with an easy waist.",
    price: 95.0,
    oldPrice: 130.0,
    discount: "-27%",
    image: "/xxxxx.png",
    category: "pants",
    rating: 4.6,
    colors: ["#f7f7f7", "#222222", "#c9d6df", "#e8dcc8"],
  },
  {
    id: 12,
    name: "Soft Scarf",
    description: "Lightweight scarf in a muted weave for layering.",
    price: 45.0,
    oldPrice: 65.0,
    discount: "-31%",
    image: "/bbg.jpg",
    category: "accessories",
    rating: 4.3,
    colors: ["#ffffff", "#111111", "#d7dee4", "#f3e2b0"],
  },
];

export const essentialItems = [
  { id: "e1", name: "Casual Wear", image: "/a.jpg" },
  { id: "e2", name: "Formal Wear", image: "/ssss.png" },
  { id: "e3", name: "Street Style", image: "/k.jpg" },
  { id: "e4", name: "Outerwear", image: "/ss.jpg" },
  { id: "e5", name: "Accessories", image: "/z.png" },
  { id: "e6", name: "New Collection", image: "/gg.jpg" },
];

export function getProductById(id) {
  return products.find((item) => String(item.id) === String(id));
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return products;
  return products.filter((item) => item.category === categoryId);
}

export function searchProducts(query) {
  const value = String(query || "").trim().toLowerCase();
  if (!value) return products;
  return products.filter((item) => {
    const haystack = [item.name, item.title, item.description, item.category]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(value);
  });
}

export const saleProducts = products.filter((item) => item.discount).slice(0, 8);

export const summerProducts = products
  .filter((item) => ["hoodies", "pants", "accessories"].includes(item.category))
  .slice(0, 4);

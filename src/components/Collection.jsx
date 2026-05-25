import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← جديد
import { getProducts } from "../services/api";
import { useCart } from "../context/CartContext";

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ← جديد

  const fallbackImages = [
    "/ss.jpg", "/aa.jpg", "/a.jpg",
    "/e.jpg", "/k.jpg", "/p.jpg",
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  return (
    <div className="w-full min-h-screen px-6 md:px-16 py-16">

      <h2 className="text-6xl md:text-5xl font-bold text-gray-800 text-center pt-8">
        NEW COLLECTION
      </h2>
      <p className="mt-4 text-gray-500 text-center font-bold">
        Discover exclusive deals on our latest collection
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch py-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center text-center shadow-md hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${item.id}`)} // ← جديد
          >
            <img
              src={item.image || fallbackImages[item.id % fallbackImages.length]}
              alt={item.name}
              onError={(e) => { e.target.src = fallbackImages[item.id % fallbackImages.length]; }}
              className="h-64 w-full object-contain mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.description}</p>
            <p className="mt-4 font-bold text-black text-lg">${item.price}</p>

            {/* 🛒 Add to Cart */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // ← مهم عشان متروحش على صفحة المنتج لما تدوس Add to Cart
                addToCart(item);
              }}
              className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-amber-900 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Collection;
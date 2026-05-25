import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const fallbackImages = [
  "/ss.jpg", "/aa.jpg", "/a.jpg",
  "/e.jpg", "/k.jpg", "/p.jpg",
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // ← جديد

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://test.tsdtecheg.com/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product || data.data || data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <h1 className="text-center text-3xl mt-40">Loading...</h1>;
  if (!product) return <h1 className="text-center text-3xl mt-40">Product not found</h1>;

  const imageSrc = product.image || fallbackImages[product.id % fallbackImages.length];

  // بيضيف المنتج بالعدد المختار
  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16 px-6 md:px-24">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-400 hover:text-black transition text-sm flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow-sm overflow-hidden">

        {/* Image */}
        <div className="md:w-[320px] w-full bg-gray-50 flex items-center justify-center p-8 shrink-0">
          <img
            src={imageSrc}
            alt={product.name}
            onError={(e) => { e.target.src = fallbackImages[product.id % fallbackImages.length]; }}
            className="w-[220px] h-[220px] object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center p-8 gap-4">

          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          <span className="text-3xl font-bold text-black">${product.price}</span>

          <hr className="border-gray-100" />

          <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>

          <hr className="border-gray-100" />

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">

            {/* Quantity Controls */}
            <div className="flex items-center border-2 border-black rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-xl font-bold hover:bg-gray-100 transition text-red-600"
              >
                −
              </button>
              <span className="px-6 py-3 text-lg font-semibold border-x-2 border-black">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 text-xl font-bold hover:bg-gray-100 transition text-green-600 "
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-amber-900 transition"
            >
              Add to Cart 🛒
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Collection() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // صور بديلة لو صور الـ API مش شغالة
  const fallbackImages = [
    "/ss.jpg",
    "/aa.jpg",
    "/a.jpg",
    "/e.jpg",
    "/k.jpg",
    "/p.jpg",
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

  // Add Product Function
  const addProduct = () => {

    const newProduct = {

      id: products.length + 1,

      title: "New Product",

      description: "This is a new product",

      price: 999,

      image: "",

    };

    setProducts([...products, newProduct]);

  };

  if (loading) {

    return (
      <h1 className="text-center text-3xl mt-20">
        Loading...
      </h1>
    );

  }

  return (

    <div className="w-full min-h-screen px-6 md:px-16 py-16">

      {/* Title */}
      <h2 className="text-6xl md:text-5xl font-bold text-gray-800 text-center pt-8">
        NEW COLLECTION
      </h2>

      <p className="mt-4 text-gray-500 text-center font-bold">
        Discover exclusive deals on our latest collection
      </p>


      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch py-10">

        {products.map((item) => (

          <div
            key={item.id}
            className="
              bg-gray-100
              p-4
              rounded-2xl
              flex
              flex-col
              items-center
              text-center
              shadow-md
              hover:scale-105
              transition
              duration-300
            "
          >

            {/* Product Image */}
            <img
              src={
                item.image ||
                fallbackImages[item.id % fallbackImages.length]
              }
              alt={item.title}
              onError={(e) => {
                e.target.src =
                  fallbackImages[item.id % fallbackImages.length];
              }}
              className="h-64 w-full object-contain mb-4"
            />

            {/* Product Title */}
            <h3 className="font-semibold text-xl text-gray-800">
              {item.title}
            </h3>

            {/* Product Description */}
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
              {item.description}
            </p>

            {/* Product Price */}
            <p className="mt-4 font-bold text-black text-lg">
              ${item.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Collection;
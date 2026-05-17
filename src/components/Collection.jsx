import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Collection() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🔥 Add Product Function

  const addProduct = () => {

    const newProduct = {

      id: products.length + 1,

      title: "New Product",

      description: "This is a new product",

      price: 999,

   

    };

    setProducts([...products, newProduct]);

  };

  if (loading) {

    return (
      <h1 className="text-center text-3xl">
        Loading...
      </h1>
    );

  }

  return (

    <div className="w-full min-h-screen text-white px-6 md:px-16 py-16">


      <h2 className="text-6xl md:text-5xl font-bold text-gray-800 text-center pt-8">
        NEW COLLECTION
      </h2>

      <p className="mt-4 text-gray-500 text-center font-bold">
        Discover exclusive deals on our latest collection
      </p>
   {/* 🔥 Button */}

      <div className="flex justify-center mb-8 pt-10">

        <button
          onClick={addProduct}
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
          hover:scale-105
          transition
          duration-300
          "
        >
          Add Product
        </button>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch py-8">

        {products.map((item) => (

          <div
            key={item.id}
            className="
            bg-gray-400
            p-4
            rounded-2xl
            flex
            flex-col
            items-center
            text-center
            hover:scale-105
            transition
            duration-300
            "
          >

            <img
              src={item.image}
              alt=""
              className="h-64 object-contain mb-4"
            />

            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="text-sm opacity-80 line-clamp-3">
              {item.description}
            </p>

            <p className="mt-2 font-bold">
              ${item.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Collection;
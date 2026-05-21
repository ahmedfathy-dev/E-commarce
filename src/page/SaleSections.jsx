import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function SaleSection() {

  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch API

  useEffect(() => {

    async function fetchProducts() {

      try {

        const data = await getProducts();

        console.log(data);

        //  نضيف Discount  وهمي
        const productsWithDiscount = Array.isArray(data)
          ? data.map((item, index) => ({

              ...item,

              oldPrice: (Number(item.price) + 40).toFixed(2),

              discount:
                index % 3 === 0
                  ? "-30%"
                  : index % 2 === 0
                  ? "-25%"
                  : "-20%",
            }))
          : [];
        setSaleItems(productsWithDiscount);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();

  }, []);

  if (loading) {

    return (

      <h1 className="text-4xl text-center py-20 pt-20 text-black">
        Loading...
      </h1>

    );

  }

  return (

    <div className="w-full bg-[#f5f5f5] py-14 px-6 md:px-16 pt-20 overflow-hidden">

      {/* Header */}

      <div className="text-center mb-12">

        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 animate-fadeUp">
          Special Offers
        </h2>

        <p className="mt-4 text-gray-500 max-w-xl mx-auto animate-fadeUp delay-200 leading-relaxed">
          Discover exclusive deals on our latest collection.
          Style meets savings — don’t miss out.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

        {Array.isArray(saleItems) &&
          saleItems.map((item, i) => (

            <div
              key={item.id}
              className="relative bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 group animate-fadeUp will-change-transform"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Discount Badge */}

              <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm">

                {item.discount}

              </span>
              {/* Image */}

              <div className="overflow-hidden rounded-xl">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 md:h-56 w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

              </div>

              {/* Info */}

              <div className="mt-5 text-center">

                <h3 className="text-base md:text-lg font-semibold text-gray-800">

                  {item.title}

                </h3>

                <div className="mt-2 flex justify-center gap-3 items-center">

                  <span className="text-pink-500 font-bold text-base md:text-lg">

                    ${item.price}

                  </span>

                  <span className="text-gray-400 line-through text-sm">

                    ${item.oldPrice}

                  </span>

                </div>

              </div>

              {/* Hover Layer */}

              <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition duration-300 pointer-events-none"></div>

            </div>

          ))}

      </div>

    </div>

  );

}

export default SaleSection;
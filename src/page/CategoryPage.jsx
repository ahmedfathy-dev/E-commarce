import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");

  // Default Images
  const defaultImages = [
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

        setLoading(true);

        const response = await fetch(
          `https://test.tsdtecheg.com/api/showCate/${id}`
        );

        const data = await response.json();

        console.log("CATEGORY DATA:", data);

        // Products
        setProducts(data.products || data.data || []);

        // Category Name
        setCategoryName(
          data.category?.name ||
          data.data?.name ||
          "Category Products"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, [id]);

  return (

    <div className="pt-32 px-6 min-h-screen bg-white">

      {/* Title */}
      <div className="mb-12 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          {categoryName}
        </h1>

        <p className="text-gray-500 mt-3">
          Explore our latest collection
        </p>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="flex items-center justify-center py-20">

          <h2 className="text-2xl font-semibold text-gray-500">
            Loading...
          </h2>

        </div>

      ) : products.length === 0 ? (

        /* Empty State */
        <div className="flex items-center justify-center py-20">

          <h2 className="text-2xl font-semibold text-gray-400">
            No Products Found
          </h2>

        </div>

      ) : (

        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product, index) => (

            <div
              key={product.id}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 bg-white"
            >

              {/* Product Image */}
              <div className="overflow-hidden">

                <img
                  src={
                    product.image ||
                    product.images?.[0] ||
                    defaultImages[index % defaultImages.length]
                  }
                  alt={product.name}
                  onError={(e) => {
                    e.target.src =
                      defaultImages[index % defaultImages.length];
                  }}
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              {/* Product Info */}
              <div className="p-5">

                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description || "Premium Fashion Product"}
                </p>

                <div className="mt-5">

                  <span className="text-2xl font-bold text-black">
                    ${product.price || "99"}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
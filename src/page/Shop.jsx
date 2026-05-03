import React from "react";

const products = [
  {
    title: "Aurora Silver",
    desc: "Reflective Puffer Jacket",
    price: "$999.99",
    img: "/ss.jpg",
  },
  {
    title: "Orbit Silver",
    desc: "High-Gloss Puffer",
    price: "$1,199.99",
    img: "/e.jpg",
  },
  {
    title: "Stealth Black",
    desc: "Heavy Shield Puffer",
    price: "$1,199.99",
    img: "/a.jpg",
  },
  {
    title: "Stealth Black",
    desc: "Heavy Shield Puffer",
    price: "$1,199.99",
    img: "/p.jpg",
  },
  {
    title: "Stealth Black",
    desc: "Heavy Shield Puffer",
    price: "$1,199.99",
    img: "/a.jpg",
  },
  {
    title: "Stealth Black",
    desc: "Heavy Shield Puffer",
    price: "$1,199.99",
    img: "/p.jpg",
  },
];

function Collection() {
  return (
    <div className="w-full min-h-screen  text-white px-6 md:px-16 py-16">
          <h2 className="text-6xl md:text-5xl font-bold text-gray-800 text-center justify-center pt-8 ">
           NEW COLLECTION
        </h2>
        
        <p className="mt-4 text-gray-500  text-center justify-center font-bold delay-200">
          Discover exclusive deals on our latest collection. Style meets savings
         
        </p>


      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch py-8">
        
        {/* Large Card */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl animate-fadeInUp">
          
          <img
            src="/aa.jpg"
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
            <h2 className="text-3xl md:text-4xl font-bold">AURORA™</h2>

            <p className="mt-2 text-lg">$1,999</p>

            <button className="mt-4 w-fit px-4 py-2 border rounded-full hover:bg-white hover:text-black transition">
              Add to cart →
            </button>
          </div>
        </div>

        {/* Product Cards */}
        {products.map((item, i) => (
          <div
            key={i}
            className="bg-gray-400 p-4 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition duration-300 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img
              src={item.img}
              alt=""
              className="h-64 object-contain mb-4"
            />

            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-sm opacity-80">{item.desc}</p>

            <p className="mt-2 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
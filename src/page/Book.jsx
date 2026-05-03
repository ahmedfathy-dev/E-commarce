import React from "react";

const looks = [
  {
    img: "/a.jpg",
    title: "Urban Street",
    desc: "Bold layers with modern attitude.",
  },
  {
    img: "/ss.jpg",
    title: "Minimal Fit",
    desc: "Clean lines for everyday elegance.",
  },
  {
    img: "/gg.jpg",
    title: "Winter Vibes",
    desc: "Stay warm without losing style.",
  },
];

function Lookbook() {
  return (
    <div className="w-full bg-white py-22 px-6 md:px-16">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 animate-fadeUp">
          Lookbook
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto animate-fadeUp delay-200 leading-relaxed">
          Explore our latest looks crafted for modern lifestyles. Each piece is
          designed to blend comfort, elegance, and street-ready confidence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {looks.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl animate-fadeUp"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            
            {/* Image */}
            <img
              src={item.img}
              alt=""
              className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
              
              <h3 className="text-white text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-200 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Article */}
      <div className="mt-16 max-w-3xl mx-auto text-center animate-fadeUp delay-300">
        
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Style is a Reflection of You
        </h3>

        <p className="mt-4 text-gray-500 leading-relaxed">
          Fashion is more than clothing — it’s a statement. Our lookbook is
          inspired by real moments, real people, and real confidence. Step into a
          world where every outfit tells a story.
        </p>
      </div>
    </div>
  );
}

export default Lookbook;
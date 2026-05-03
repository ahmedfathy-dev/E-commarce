import React from "react";

function Hero() {
  return (
    <div>
      <div className="min-h-screen bg-cover bg-center w-full">
        <div
          className="min-h-screen bg-cover w-full flex items-center"
          style={{
            backgroundImage: "url('gg.jpg')",
          }}
        >
          {/* المحتوى */}
          <div className="px-6 sm:px-10 md:px-16 w-full text-gray-500">
            
            {/* العنوان */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-fadeInUp">
              Difine
            </h1>

            <p className="text-4xl sm:text-5xl md:text-6xl font-bold animate-fadeInUp delay-150">
              your style
            </p>

            {/* الوصف */}
            <p className="text-lg sm:text-xl md:text-2xl pt-6 sm:pt-10 typing animate-fadeInUp delay-300">
              Modern Manswear For Evry Occasion
            </p>

            {/* الأزرار */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 text-lg sm:text-xl md:text-2xl animate-fadeInUp delay-500">
              
              <button className="px-6 py-3 bg-gray-700 text-white rounded-2xl hover:scale-105 hover:shadow-lg transition duration-300">
                Shop Now
              </button>

              <button className="px-6 py-3 border border-gray-700 text-gray-700 rounded-2xl hover:scale-105 hover:bg-gray-700 hover:text-white transition duration-300">
                New Araivel
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
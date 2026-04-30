import React from 'react'

function Hero() {
  return (
    <div>  
      <div className="min-h-screen bg-cover bg-center w-full">
        
        <div
          className="min-h-screen bg-cover w-full "
          style={{
            backgroundImage: "url('gg.jpg')",
            backgroundPosition: " ", // 
          }}
        >

          <div className='pl-10 justify-center w-full pt-40 text-6xl text-gray-500'>

            <h1>
              Difine   
            </h1>

            <p>
              your style 
            </p>

            
            <p className='text-2xl pt-10 typing'>
              Modern Manswear For Evry Occasion
            </p>

            {/*  الزرارين */}
            <div className="mt-8 flex gap-4 text-2xl">
              <button className="px-6 py-3 bg-black text-white rounded-2xl hover:scale-105 transition">
               Shop Now
              </button>

              <button className="px-6  border border-black text-black rounded-2xl transition hover:scale-105 ">
New Araivel              
</button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Hero
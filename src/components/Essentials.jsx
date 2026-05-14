import React, { useRef, useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Essentials() {

  const scrollRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [products, setProducts] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);

  //  Fetch API

  useEffect(() => {

    async function fetchProducts() {

      try {

        const data = await getProducts();

        //  نكرر المنتجات عشان يبقى infinite
        setProducts([...data, ...data]);

      } catch (error) {

        console.log(error);

      }

    }

    fetchProducts();

  }, []);

  // 🔥 Auto scroll

  useEffect(() => {

    const container = scrollRef.current;

    const speed = 0.5;

    let animation;

    const animate = () => {

      if (!container || isDown.current) return;

      container.scrollLeft += speed;

      if (container.scrollLeft >= container.scrollWidth / 2) {

        container.scrollLeft = container.scrollWidth / 4;

      }

      updateCenter();

      animation = requestAnimationFrame(animate);

    };

    animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);

  }, [products]);

  // 🎯 تحديد الكارد اللي في النص

  const updateCenter = () => {

    const container = scrollRef.current;

    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;

    const children = Array.from(container.children);

    let closest = 0;

    let minDist = Infinity;

    children.forEach((child, i) => {

      const box = child.offsetLeft + child.offsetWidth / 2;

      const dist = Math.abs(center - box);

      if (dist < minDist) {

        minDist = dist;

        closest = i;

      }

    });

    setCenterIndex(closest);

  };

  // 🖱️ Drag

  const onMouseDown = (e) => {

    isDown.current = true;

    const container = scrollRef.current;

    startX.current = e.pageX - container.offsetLeft;

    scrollLeft.current = container.scrollLeft;

  };

  const onMouseLeave = () => {

    isDown.current = false;

  };

  const onMouseUp = () => {

    isDown.current = false;

  };

  const onMouseMove = (e) => {

    if (!isDown.current) return;

    e.preventDefault();

    const container = scrollRef.current;

    const x = e.pageX - container.offsetLeft;

    const walk = (x - startX.current) * 1.5;

    container.scrollLeft = scrollLeft.current - walk;

  };

  return (

    <div className="px-6 py-10 bg-[#f5f5f5] relative">

      {/* Title */}

      <div className="flex items-center gap-4 mb-6">

        <h2 className="text-xl tracking-widest text-gray-500">
          ESSENTIALS
        </h2>

        <div className="flex-1 h-[1px] bg-gray-500"></div>

      </div>

      {/* Scroll */}

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-6 p-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      >

        {products.map((item, index) => (

          <div
            key={index}
            className={`min-w-[220px] bg-white rounded-xl shadow-md transition-all duration-300 relative ${
              index === centerIndex
                ? "scale-110 shadow-2xl z-20"
                : "scale-95 opacity-70 z-10"
            }`}
          >

            <div className="rounded-xl overflow-hidden">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] object-cover"
              />

            </div>

            <div className="p-4 text-center">

              <p className="text-gray-700 font-medium">
                {item.title}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Essentials;
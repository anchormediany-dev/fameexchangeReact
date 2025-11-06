import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import blackCap from "../assets/images/black-cap.png";
import blueShirt from "../assets/images/blue-shirt.png";
import blackShirt from "../assets/images/black-shirt.png";
import musicPerson from "../assets/images/music-person.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = () => {
  const products = [
    {
      id: 1,
      name: "Fame Exchange Black printed Shirt",
      image: blackShirt,
      price: "$129.99",
    },
    {
      id: 2,
      name: "Fame Exchange Cap",
      image: blackCap,
      price: "$199.99",
    },
    {
      id: 3,
      name: "Fame Exchange Blue printed Shirt",
      image: blueShirt,
      price: "$79.99",
    },
    {
      id: 4,
      name: "Fame Exchange Gattar",
      image: musicPerson,
      price: "$59.99",
    },
    {
      id: 5,
      name: "Fame Exchange Black printed Shirt",
      image: blackShirt,
      price: "$129.99",
    },
    {
      id: 6,
      name: "Fame Exchange Cap",
      image: blackCap,
      price: "$199.99",
    },
    {
      id: 7,
      name: "Fame Exchange Blue printed Shirt",
      image: blueShirt,
      price: "$79.99",
    },
    {
      id: 8,
      name: "Fame Exchange Gattar",
      image: musicPerson,
      price: "$59.99",
    },
  ];

  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(4);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  return (
    <section className="w-full py-8 shadow-2xl">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h3 className="custom-heading-six text-[#a38b41] uppercase  mb-2">
            OUR PRODUCTS
          </h3>
          {/* <h2 className="text-3xl md:text-4xl font-bold text-white">
            Premium Collection
          </h2> */}
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            navigation={{
              nextEl: ".swiper-button-next-compact",
              prevEl: ".swiper-button-prev-compact",
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-[#171717] backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#a38b41]/30 transition-all duration-300 overflow-hidden group">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-700/30 to-gray-800/30 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full cursor-pointer object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info - Compact */}
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2  transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-[#a38b41] mb-3">
                      {product.price}
                    </p>

                    {/* Buy Now Button */}
                    <button className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7738] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm hover:scale-105 active:scale-95">
                      <FiShoppingCart className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-compact absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <FiChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button className="swiper-button-next-compact absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <FiChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

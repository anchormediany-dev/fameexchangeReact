import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import image5 from "../assets/our-products/5.jpg";
import image6 from "../assets/our-products/6.jpg";
import image7 from "../assets/our-products/7.jpg";
import image8 from "../assets/our-products/8.jpg";
import image9 from "../assets/our-products/9.jpg";
import image10 from "../assets/our-products/10.jpg";
import image11 from "../assets/our-products/11.jpg";
import image12 from "../assets/our-products/12.jpg";
import image13 from "../assets/our-products/13.jpg";
import image14 from "../assets/our-products/14.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ProductSlider = () => {
  const products = [
    {
      id: 5,
      name: "6th GENERATION BLACK BARREL MUGS",
      image: image5,
      price: "$129.99",
    },
    {
      id: 6,
      name: "6th GENERATION WHITE BARREL MUGS",
      image: image6,
      price: "$129.99",
    },
    {
      id: 7,
      name: "6th GENERATION/ FRONT ZIPPER HOODIES BLACK",
      image: image7,
      price: "$129.99",
    },
    {
      id: 8,
      name: "6th GENERATION/ FRONT ZIPPER HOODIES WHITE",
      image: image8,
      price: "$129.99",
    },
    {
      id: 9,
      name: "6th GENERATION/ BLACK PULL OVER HOODIES",
      image: image9,
      price: "$129.99",
    },
    {
      id: 10,
      name: "6th GENERATION/ WHITE PULL OVER HOODIES",
      image: image10,
      price: "$129.99",
    },
    {
      id: 11,
      name: "5th GENERATION/ BULL & BEAR T-SHIRT (BLK)",
      image: image11,
      price: "$129.99",
    },
    {
      id: 12,
      name: "6th GENERATION/ FAME DESIGN T-SHIRT (BLK)",
      image: image12,
      price: "$129.99",
    },
    {
      id: 13,
      name: "5th GENERATION/ BULL & BEAR T-SHIRT (WHITE)",
      image: image13,
      price: "$129.99",
    },
    {
      id: 14,
      name: "6th GENERATION/ FAME DESIGN T-SHIRT (WHITE)",
      image: image14,
      price: "$129.99",
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
          <h3 className="custom-heading-six text-[#a38b41] uppercase mb-2">
            CELEBRITY MERCHANDISE
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
                <div className="group relative bg-[#171717] backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#a38b41]/30 transition-all duration-300 overflow-hidden">
                  {/* Product Image */}
                  <div className=" w-full rounded-md  object-cover overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:opacity-75  lg:h-80"
                    />
                  </div>

                  {/* Product Info - New Layout */}
                  <div className="mt-4 flex justify-between p-4">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-sm text-white truncate">
                        <a href="#" className="block truncate">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          ></span>
                          {product.name}
                        </a>
                      </h3>
                      {/* You can add color/variant info here if needed */}
                      {/* <p className="mt-1 text-sm text-gray-400 truncate">Black</p> */}
                    </div>
                    <p className="text-sm font-medium text-[#a38b41] flex-shrink-0 whitespace-nowrap">
                      {product.price}
                    </p>
                  </div>

                  {/* Buy Now Button */}
                  <div className="p-4 pt-0">
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
          <button className="swiper-button-prev-compact absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#e2cb68] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <FiChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button className="swiper-button-next-compact absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#e2cb68] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
            <FiChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

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
import { useGetProductsQuery } from "../app/authApi";
import { imgSrc } from "../utils/imgSrc";
import ImageLightbox from "./ImageLightbox";
import ProductCheckoutModal from "./ProductCheckoutModal";
const ProductSlider = () => {
  const { data, error, isError, isLoading } = useGetProductsQuery();
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewAlt, setPreviewAlt] = useState("");
  const [checkoutProduct, setCheckoutProduct] = useState(null);
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
  const apiProducts = data?.data ?? [];
  const isEmpty = !isLoading && !isError && apiProducts.length === 0;
  return (
    <section className="w-full py-8 shadow-2xl">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h3 className="custom-heading-two text-[#a38b41] mb-8 flex-grow text-center mb-2">
            CELEBRITY MERCHANDISE
          </h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-sm text-gray-300">Loading products...</p>
            </div>
          ) : isError ? (
            <div className="w-full rounded-xl overflow-hidden h-[400px] lg:h-[650px] flex items-center justify-center">
              <div className="text-sm text-red-600">
                Failed to load products. Please try again later.
              </div>
            </div>
          ) : isEmpty ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-sm text-gray-300">No products found.</p>
            </div>
          ) : (
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
                {data?.data?.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="group relative bg-[#171717] backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#a38b41]/30 transition-all duration-300 overflow-hidden">
                      {/* Product Image (click to preview) */}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewSrc(imgSrc(product.image));
                          setPreviewAlt(product.title || "product");
                        }}
                        className="w-full bg-[#0a0a0a] aspect-square flex items-center justify-center overflow-hidden cursor-zoom-in"
                        aria-label={`Preview ${product.title}`}
                      >
                        <img
                          src={imgSrc(product.image)}
                          alt={product.title}
                          className="max-w-full max-h-full object-contain p-3 group-hover:opacity-90 transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>

                      {/* Product Info - New Layout */}
                      <div className="mt-4 flex justify-between p-4">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-sm text-white truncate">
                            <span className="block truncate text-left">
                              {product.title}
                            </span>
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-[#a38b41] flex-shrink-0 whitespace-nowrap">
                          ${product.price}
                        </p>
                      </div>

                      {/* Buy Now Button */}
                      <div className="p-4 pt-0">
                        <button
                          type="button"
                          onClick={() => setCheckoutProduct(product)}
                          className="w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7738] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm hover:scale-105 active:scale-95"
                        >
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
          )}
        </div>

        {/* Swiper Slider */}
      </div>

      <ImageLightbox
        src={previewSrc}
        alt={previewAlt}
        onClose={() => setPreviewSrc(null)}
      />
      <ProductCheckoutModal
        product={checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </section>
  );
};

export default ProductSlider;

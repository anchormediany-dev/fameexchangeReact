import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useGetProductsQuery } from "../app/authApi";
import { imgSrc } from "../utils/imgSrc";
import ImageLightbox from "../components/ImageLightbox";
import ProductCheckoutModal from "../components/ProductCheckoutModal";
import { FiShoppingCart, FiSearch, FiX } from "react-icons/fi";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewAlt, setPreviewAlt] = useState("");
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const limit = 8;

  const { data, error, isError, isLoading, isFetching } = useGetProductsQuery({
    page,
    limit,
    search: appliedSearch,
  });

  const apiProducts = data?.data ?? [];
  const pagination = data?.pagination;

  const totalItems = pagination?.total || apiProducts.length;
  const totalPages = pagination?.pages || 1;

  const isEmpty = !isLoading && !isError && apiProducts.length === 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setAppliedSearch("");
    setPage(1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header + Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="custom-heading-two text-[#a38b41] mb-3">
                CELEBRITY MERCHANDISE
              </h3>
              {/* <p className="text-sm md:text-base text-gray-300 max-w-2xl md:max-w-xl mx-auto md:mx-0">
                Explore exclusive, limited-run drops designed for The Fame
                Exchange community.
              </p> */}
            </div>

            {/* Search with clear */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full md:w-[320px] lg:w-[360px]"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border border-white/15 bg-black/50 px-4 py-2.5 pr-12 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a38b41]/70 focus:border-[#a38b41]/70 transition-all"
                />

                {/* Right-side icons: clear + search */}
                <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="p-1 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Clear search"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="p-1.5 rounded-full text-[#a38b41] hover:text-[#d1b85b] hover:bg-[#a38b41]/10 transition-colors"
                    aria-label="Search"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-sm text-gray-300">Loading products...</p>
            </div>
          ) : isError ? (
            <div className="w-full rounded-xl overflow-hidden min-h-[220px] flex items-center justify-center bg-black/50 border border-red-500/30">
              <div className="text-sm text-red-400 text-center px-4">
                Failed to load products. Please try again later.
              </div>
            </div>
          ) : isEmpty ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-sm text-gray-300">
                No products found. Try a different search.
              </p>
            </div>
          ) : (
            <>
              {/* Products grid */}
              <div className=" w-full">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {apiProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group flex flex-col bg-[#111111]/95 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#a38b41]/50 hover:shadow-[0_0_25px_rgba(163,139,65,0.45)] transition-all duration-300 overflow-hidden"
                    >
                      {/* Product Image (click to preview) */}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewSrc(imgSrc(product.image));
                          setPreviewAlt(product.title || "product");
                        }}
                        className="relative w-full aspect-square bg-[#0a0a0a] overflow-hidden flex items-center justify-center cursor-zoom-in"
                        aria-label={`Preview ${product.title}`}
                      >
                        <img
                          src={imgSrc(product.image)}
                          alt={product.title}
                          className="max-w-full max-h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>

                      {/* Product Info (no description) */}
                      <div className="flex flex-col flex-1 p-4 gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                            {product.title}
                          </h3>
                          <p className="text-sm font-semibold text-[#a38b41] whitespace-nowrap">
                            ${product.price}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCheckoutProduct(product)}
                          className="mt-auto w-full cursor-pointer bg-[#a38b41] hover:bg-[#8a7738] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm hover:scale-[1.02] active:scale-95"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="w-full mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">
                  {totalItems > 0 && (
                    <>
                      Showing{" "}
                      <span className="text-[#a38b41] font-medium">
                        {(page - 1) * limit + 1}
                      </span>{" "}
                      –{" "}
                      <span className="text-[#a38b41] font-medium">
                        {Math.min(page * limit, totalItems)}
                      </span>{" "}
                      of{" "}
                      <span className="text-[#a38b41] font-medium">
                        {totalItems}
                      </span>{" "}
                      products
                    </>
                  )}
                  {isFetching && (
                    <span className="ml-2 text-[11px] text-gray-500">
                      (updating…)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center md:justify-end gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-3 py-1.5 text-xs md:text-sm rounded-full border transition-all ${
                      page === 1
                        ? "border-white/10 text-gray-500 cursor-not-allowed"
                        : "border-white/20 text-gray-200 hover:border-[#a38b41]/70 hover:text-[#d1b85b]"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-xs md:text-sm text-gray-300 px-2">
                    Page{" "}
                    <span className="text-[#a38b41] font-semibold">{page}</span>{" "}
                    of{" "}
                    <span className="text-[#a38b41] font-semibold">
                      {totalPages}
                    </span>
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={page >= totalPages}
                    className={`px-3 py-1.5 text-xs md:text-sm rounded-full border transition-all ${
                      page >= totalPages
                        ? "border-white/10 text-gray-500 cursor-not-allowed"
                        : "border-white/20 text-gray-200 hover:border-[#a38b41]/70 hover:text-[#d1b85b]"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />

      <ImageLightbox
        src={previewSrc}
        alt={previewAlt}
        onClose={() => setPreviewSrc(null)}
      />
      <ProductCheckoutModal
        product={checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </div>
  );
};

export default AllProducts;

// import React, { useState, useMemo, useEffect } from "react";
// import { FiUpload } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import MotionPageWrapper from "../../components/MotionPageWrapper";
// import { toast } from "react-toastify";
// import { useCreateEventMutation } from "../../app/authApi";
// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [createEvent, { isLoading }] = useCreateEventMutation();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//   });

//   const [eventImages, setEventImages] = useState([]);
//   const imagePreviews = useMemo(
//     () => eventImages.map((f) => URL.createObjectURL(f)),
//     [eventImages]
//   );

//   useEffect(() => {
//     return () => {
//       if (logoPreview) URL.revokeObjectURL(logoPreview);
//       if (coverPreview) URL.revokeObjectURL(coverPreview);
//       imagePreviews.forEach((u) => URL.revokeObjectURL(u));
//     };
//   }, [logoPreview, coverPreview, imagePreviews]);

//   /* ---------- handlers ---------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const numeric = ["regular_price", "price", "no_of_tickets"];
//     if (numeric.includes(name)) {
//       setForm((s) => ({ ...s, [name]: value === "" ? "" : Number(value) }));
//     } else {
//       setForm((s) => ({ ...s, [name]: value }));
//     }
//   };

//   // file inputs
//   const resetInput = (input) => {
//     try {
//       input.value = "";
//     } catch {}
//   };

//   const handleGalleryChange = (e) => {
//     const files = Array.from(e.target.files || []);
//     setEventImages(files);
//     resetInput(e.target);
//   };

//   // formData
//   const buildFormData = () => {
//     const fd = new FormData();
//     if (logo) fd.append("logo", logo);
//     if (eventCover) fd.append("event_cover", eventCover);
//     eventImages.forEach((f) => fd.append("event_images", f));

//     const cleanPurchaseUrls = (form.purchase_url || [])
//       .map((u) => (u || "").trim())
//       .filter(Boolean);

//     // Filter out empty discount objects and clean the data
//     const cleanDiscounts = form.discounts
//       .filter(
//         (discount) =>
//           discount.discount_codes?.trim() && discount.discount_percent !== ""
//       )
//       .map((discount) => ({
//         discount_percent: Number(discount.discount_percent),
//         discount_codes: discount.discount_codes.trim(),
//       }));
//     const eventTypes = Array.isArray(form.event_type)
//       ? form.event_type
//       : [form.event_type].filter(Boolean);
//     const eventTypeString = eventTypes.join(",");
//     Object.entries({
//       datetime: form.datetime,
//       title: form.title,
//       summary: form.summary,
//       details: form.details,
//       event_type: eventTypeString,
//       event_type: form.event_type,
//       status: form.status,
//       category: form.category,
//       location: form.location,
//       address: form.address,
//       phone: form.phone,
//       website: form.website,
//       organizername: form.organizername,
//       is_featured: String(form.is_featured),

//       // pricing/discounts - UPDATED: Now sending array
//       regular_price: String(form.regular_price ?? ""),
//       discounts: JSON.stringify(cleanDiscounts), // Send as JSON string

//       talent: JSON.stringify(form.talent || []),

//       // tickets
//       is_free: String(form.is_free),
//       price: String(form.is_free ? 0 : form.price ?? ""),
//       no_of_tickets: String(form.no_of_tickets ?? ""),
//       purchase_url: JSON.stringify(cleanPurchaseUrls),
//     }).forEach(([k, v]) => fd.append(k, v));

//     return fd;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = buildFormData();
//       await createEvent(formData).unwrap();
//       toast.success("Product created successfully!");

//       // Reset form
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//       });
//       setLogo(null);
//       setEventCover(null);
//       setEventImages([]);
//       setTimeout(() => navigate("/events"), 500);
//     } catch (err) {
//       toast.error(
//         err?.data?.message ||
//           err?.error ||
//           err?.message ||
//           "Failed to create event"
//       );
//     }
//   };

//   return (
//     <MotionPageWrapper>
//       <div className="flex relative overflow-hidden">
//         <div className="w-full container flex flex-col z-10">
//           <div className="bg-[#222222] p-8 rounded-xl border border-[#333333]">
//             <h2 className="text-white custom-heading-two mb-8">Add Product</h2>

//             <form onSubmit={onSubmit} className="space-y-8">
//               {/* Basic Information */}
//               <div className="grid gap-6">
//                 <div>
//                   <label className="block text-white text-sm font-medium mb-2">
//                     Product Title*
//                   </label>
//                   <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
//                     <input
//                       type="text"
//                       name="title"
//                       value={form.title}
//                       onChange={handleChange}
//                       placeholder="Enter event title"
//                       className="bg-transparent outline-none w-full text-white placeholder-gray-400"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-white text-sm font-medium mb-2">
//                     Product Details*
//                   </label>
//                   <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
//                     <textarea
//                       name="description"
//                       value={form.description}
//                       onChange={handleChange}
//                       rows={3}
//                       className="bg-transparent outline-none w-full text-white"
//                       placeholder="Brief description that appears in listings"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-white text-sm font-medium mb-2">
//                     Price*
//                   </label>
//                   <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
//                     <input
//                       type="text"
//                       name="title"
//                       value={form.title}
//                       onChange={handleChange}
//                       placeholder="Enter event title"
//                       className="bg-transparent outline-none w-full text-white placeholder-gray-400"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Product Images */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="">
//                   <label
//                     htmlFor="eventGalleryInput"
//                     className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group"
//                   >
//                     <FiUpload className="w-4 h-4 text-gray-400  mb-1 transition-colors" />
//                     <span className="text-xs text-gray-400  transition-colors text-center">
//                       Product Images
//                     </span>
//                   </label>
//                   <input
//                     id="eventGalleryInput"
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleGalleryChange}
//                     className="sr-only"
//                   />
//                   {imagePreviews?.length > 0 && (
//                     <div className="mt-2">
//                       <div className="flex gap-2 flex-wrap">
//                         {imagePreviews.map((src, i) => (
//                           <div key={i} className="relative">
//                             <img
//                               src={src}
//                               alt={`img-${i}`}
//                               className="h-16 w-16 object-cover rounded"
//                             />
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 setEventImages((prev) =>
//                                   prev.filter((_, idx) => idx !== i)
//                                 )
//                               }
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setEventImages([])}
//                         className="mt-2 text-red-500 text-sm"
//                       >
//                         Clear All
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="px-8 py-3 custom-button-two text-black rounded-md font-medium hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "Adding..." : "Add Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </MotionPageWrapper>
//   );
// }
// src/pages/admin/AddProduct.jsx
import React, { useState, useMemo, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { toast } from "react-toastify";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // if you route as /admin/products/:id/edit
  console.log(id);
  const isEditMode = Boolean(id);

  // RTK Query hooks
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const {
    data: productFullData,
    isLoading: isProductLoading,
    isFetching: isProductFetching,
  } = useGetProductByIdQuery(id, {
    skip: !isEditMode,
  });
  const productData = productFullData?.data;
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  // Local file state (we’ll only send the FIRST file as `image` in FormData)
  const [eventImages, setEventImages] = useState([]);

  const imagePreviews = useMemo(
    () => eventImages.map((f) => URL.createObjectURL(f)),
    [eventImages]
  );

  // Cleanup previews
  useEffect(() => {
    return () => {
      imagePreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [imagePreviews]);

  // When editing: pre-fill with existing product data
  useEffect(() => {
    if (isEditMode && productData) {
      setForm({
        title: productData?.title || "",
        description: productData?.description || "",
        price:
          productData?.price !== undefined && productData?.price !== null
            ? String(productData.price)
            : "",
      });
      // If you want, you could store existing image URL in state here for preview
    }
  }, [isEditMode, productData]);

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const resetInput = (input) => {
    try {
      input.value = "";
    } catch {}
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setEventImages(files);
    resetInput(e.target);
  };

  // Build FormData: title, description, price, image
  const buildFormData = () => {
    const fd = new FormData();
    fd.append("title", form.title || "");
    fd.append("description", form.description || "");
    fd.append("price", form.price || "");

    // BACKEND EXPECTS: image (single)
    if (eventImages[0]) {
      fd.append("image", eventImages[0]);
    }

    return fd;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = buildFormData();

      if (isEditMode) {
        // UPDATE
        await updateProduct({ id, formData }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        // CREATE
        await createProduct(formData).unwrap();
        toast.success("Product created successfully!");
      }

      // Reset form after success (for add mode)
      if (!isEditMode) {
        setForm({
          title: "",
          description: "",
          price: "",
        });
        setEventImages([]);
      }

      // Navigate back to product list (adjust route as needed)
      setTimeout(() => navigate("/admin/products"), 500);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          (isEditMode ? "Failed to update product" : "Failed to create product")
      );
    }
  };

  const loading =
    isCreating ||
    isUpdating ||
    (isEditMode && (isProductLoading || isProductFetching));

  return (
    <MotionPageWrapper>
      <div className="flex relative overflow-hidden">
        <div className="w-full container flex flex-col z-10">
          <div className="bg-[#222222] p-8 rounded-xl border border-[#333333]">
            <h2 className="text-white custom-heading-two mb-8">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid gap-6">
                {/* Title */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Product Title*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Product Details*
                  </label>
                  <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      className="bg-transparent outline-none w-full text-white"
                      placeholder="Brief description that appears in listings"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Price*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="text"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label
                    htmlFor="eventGalleryInput"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group"
                  >
                    <FiUpload className="w-4 h-4 text-gray-400 mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 transition-colors text-center">
                      {isEditMode
                        ? "Change Product Image"
                        : "Upload Product Image"}
                    </span>
                  </label>
                  <input
                    id="eventGalleryInput"
                    type="file"
                    accept="image/*"
                    multiple={false} // single image for `image` field
                    onChange={handleGalleryChange}
                    className="sr-only"
                  />

                  {/* Existing or newly selected preview */}
                  {imagePreviews?.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-2 flex-wrap">
                        {imagePreviews.map((src, i) => (
                          <div key={i} className="relative">
                            <img
                              src={src}
                              alt={`img-${i}`}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEventImages((prev) =>
                                  prev.filter((_, idx) => idx !== i)
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setEventImages([])}
                        className="mt-2 text-red-500 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {/* Optional: show existing server image when editing and no new image selected */}
                  {isEditMode &&
                    !imagePreviews.length &&
                    productData?.image && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 mb-1">
                          {/* Current Image: */}
                        </p>
                        <img
                          src={imgSrc(productData?.image)} // adjust if you need imgSrc()
                          alt="current-product"
                          className="h-16 w-16 object-cover rounded"
                        />
                      </div>
                    )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 custom-button-two text-black rounded-md font-medium hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
}

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
  FaPhone,
  FaImage,
  FaDollarSign,
  FaPercent,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../app/authApi";

const DiscountCodeInput = ({ value, onChange, onRemove, index }) => (
  <div className="relative">
    <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Discount code ${index + 1}`}
        className="bg-transparent outline-none w-full text-white placeholder-gray-400"
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <IoClose size={18} />
      </button>
    </div>
  </div>
);

export default function EventCreateForm() {
  const navigate = useNavigate();
  const [createEvent, { isLoading, error }] = useCreateEventMutation();
  const [form, setForm] = useState({
    datetime: "",
    title: "",
    summary: "",
    details: "",
    event_type: "live",
    status: "active",
    category: "",
    location: "",
    address: "",
    phone: "",
    website: "",
    organizername: "",
    is_featured: true,
    regular_price: "",
    discount_percent: "",
    discount_codes: [],
    event_coordinates: { lat: "", long: "" },
    prefrence: "interested",
  });

  // Files + previews
  const [logo, setLogo] = useState(null);
  const [eventCover, setEventCover] = useState(null);
  const [eventImages, setEventImages] = useState([]);
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const logoPreview = useMemo(
    () => (logo ? URL.createObjectURL(logo) : ""),
    [logo]
  );
  const coverPreview = useMemo(
    () => (eventCover ? URL.createObjectURL(eventCover) : ""),
    [eventCover]
  );
  const imagePreviews = useMemo(
    () => eventImages.map((f) => URL.createObjectURL(f)),
    [eventImages]
  );

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      imagePreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [logoPreview, coverPreview, imagePreviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["regular_price", "discount_percent"];
    if (numeric.includes(name)) {
      setForm((s) => ({ ...s, [name]: value === "" ? "" : Number(value) }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleBoolean = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.checked }));

  const handleCoordsChange = (key, v) =>
    setForm((s) => ({
      ...s,
      event_coordinates:
        key === "lat"
          ? { ...s.event_coordinates, lat: Number(v) }
          : { ...s.event_coordinates, long: Number(v) },
    }));

  const handleArrayChange = (idx, v) =>
    setForm((s) => {
      const next = [...s.discount_codes];
      next[idx] = v;
      return { ...s, discount_codes: next };
    });

  const addDiscountCode = () =>
    setForm((s) => ({ ...s, discount_codes: [...s.discount_codes, ""] }));

  const removeDiscountCode = (idx) =>
    setForm((s) => ({
      ...s,
      discount_codes: s.discount_codes.filter((_, i) => i !== idx),
    }));

  const buildFormData = () => {
    const fd = new FormData();

    if (logo) fd.append("logo", logo);
    if (eventCover) fd.append("event_cover", eventCover);
    eventImages.forEach((f) => fd.append("event_images", f)); // same key for all images

    Object.entries({
      datetime: form.datetime,
      title: form.title,
      summary: form.summary,
      details: form.details,
      event_type: form.event_type,
      status: form.status,
      category: form.category,
      location: form.location,
      address: form.address,
      phone: form.phone,
      website: form.website,
      organizername: form.organizername,
      is_featured: String(form.is_featured), // ← stringify boolean
      regular_price: String(form.regular_price ?? ""),
      discount_percent: String(form.discount_percent ?? ""),
      prefrence: form.prefrence,
      discount_codes: JSON.stringify(form.discount_codes || []),
      event_coordinates: JSON.stringify(form.event_coordinates || {}),
    }).forEach(([k, v]) => fd.append(k, v));

    return fd;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = buildFormData();
      const response = await createEvent(formData).unwrap();

      toast.success("Event created successfully!");
      // Reset form after successful submission
      setForm({
        datetime: "",
        title: "",
        summary: "",
        details: "",
        event_type: "live",
        status: "active",
        category: "music",
        location: "",
        address: "",
        phone: "",
        website: "",
        organizername: "",
        is_featured: true,
        regular_price: "",
        discount_percent: "",
        discount_codes: [],
        event_coordinates: { lat: "", long: "" },
        prefrence: "interested",
      });
      setLogo(null);
      setEventCover(null);
      setEventImages([]);
      setTimeout(() => navigate("/events"), 500);
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Failed to create event"
      );
    }
  };

  const sectionTitleCls =
    "text-lg font-semibold mb-4 col-span-full gredient-text";

  return (
    <MotionPageWrapper>
      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 relative bg-[#171717] overflow-hidden">
        <div className="w-full container flex flex-col z-10">
          <div className="bg-[#222222] p-8 rounded-xl border border-[#333333]">
            <h2 className="text-white custom-heading-two mb-8">
              Create New Event
            </h2>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Basic Information</h2>

                {/* Title */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Title*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter event title"
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Organizer */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Organizer Name*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="text"
                      name="organizername"
                      placeholder="Enter organizer name"
                      value={form.organizername}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Category*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g., Music"
                      className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Type*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <select
                      name="event_type"
                      value={form.event_type}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full text-white"
                      required
                    >
                      <option value="live" className="bg-[#2d2d2d]">
                        Live
                      </option>
                      <option value="virtual" className="bg-[#2d2d2d]">
                        Virtual
                      </option>
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Status*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full text-white"
                      required
                    >
                      <option value="active" className="bg-[#2d2d2d]">
                        Active
                      </option>
                      <option value="inactive" className="bg-[#2d2d2d]">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>

                {/* Preference */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Preference
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <select
                      name="prefrence"
                      value={form.prefrence}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full text-white"
                    >
                      <option value="interested" className="bg-[#2d2d2d]">
                        Interested
                      </option>
                      <option value="notinterested" className="bg-[#2d2d2d]">
                        Not interested
                      </option>
                      <option value="attending" className="bg-[#2d2d2d]">
                        Attending
                      </option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Date & Time*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <input
                      type="datetime-local"
                      name="datetime"
                      value={form.datetime}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full text-white"
                      required
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-3 col-span-full">
                  <input
                    id="is_featured"
                    type="checkbox"
                    name="is_featured"
                    checked={form.is_featured}
                    onChange={handleBoolean}
                    className="rounded bg-transparent border-[#F3BA18] text-[#F3BA18] focus:ring-[#F3BA18] h-5 w-5"
                  />
                  <label
                    htmlFor="is_featured"
                    className={`text-sm ${
                      form.is_featured ? "gredient-text" : "text-gray-400"
                    }`}
                  >
                    Mark as Featured Event
                  </label>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Location Details</h2>

                {/* Location */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Location (City)*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaMapMarkerAlt className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="bg-transparent outline-none w-full text-white"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Address*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaMapMarkerAlt className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="bg-transparent outline-none w-full text-white"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaPhone className="text-gray-400 mr-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Website
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaLink className="text-gray-400 mr-3" />
                    <input
                      type="url"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="Enter website URL"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>

                {/* Coordinates */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Latitude
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="number"
                      step="any"
                      value={form.event_coordinates.lat}
                      onChange={(e) =>
                        handleCoordsChange("lat", e.target.value)
                      }
                      placeholder="Enter latitude"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Longitude
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="number"
                      step="any"
                      value={form.event_coordinates.long}
                      onChange={(e) =>
                        handleCoordsChange("long", e.target.value)
                      }
                      placeholder="Enter longitude"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Pricing & Discounts</h2>

                {/* Regular Price */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Regular Price*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaDollarSign className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="regular_price"
                      value={form.regular_price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Enter price"
                      className="bg-transparent outline-none w-full text-white"
                      required
                    />
                  </div>
                </div>

                {/* Discount Percent */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Discount (%)
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaPercent className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="discount_percent"
                      value={form.discount_percent}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="1"
                      placeholder="Enter discount %"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>

                {/* Discount Codes */}
                <div className="md:col-span-2 lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-white text-sm font-medium mb-2">
                      Discount Codes
                    </label>
                    <span className="text-xs text-gray-500">
                      {form.discount_codes.length} added
                    </span>
                  </div>

                  <div className="space-y-3">
                    {form.discount_codes.map((code, idx) => (
                      <DiscountCodeInput
                        key={idx}
                        value={code}
                        onChange={(e) => handleArrayChange(idx, e.target.value)}
                        onRemove={() => removeDiscountCode(idx)}
                        index={idx}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addDiscountCode}
                    className="flex items-center gap-2 text-sm gredient-text hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add another discount code
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="grid grid-cols-1 gap-6">
                <h2 className={sectionTitleCls}>Content</h2>

                {/* Summary */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Summary*
                  </label>
                  <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <textarea
                      name="summary"
                      value={form.summary}
                      onChange={handleChange}
                      rows={3}
                      className="bg-transparent outline-none w-full text-white"
                      placeholder="Brief description that appears in listings"
                      required
                    />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Details*
                  </label>
                  <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      rows={6}
                      className="bg-transparent outline-none w-full text-white"
                      placeholder="Full event description with all details"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Media</h2>

                {/* Logo */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Logo
                  </label>

                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#333333] rounded-lg cursor-pointer hover:border-[#F3BA18] bg-[#2d2d2d]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG (1:1 ratio)
                      </p>
                    </div>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </div>

                  {logoPreview && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={logoPreview}
                        alt="logo preview"
                        className="h-12 w-12 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setLogo(null)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Event Cover */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Cover
                  </label>

                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#333333] rounded-lg cursor-pointer hover:border-[#F3BA18] bg-[#2d2d2d]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG (16:9 ratio)
                      </p>
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEventCover(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </div>

                  {coverPreview && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={coverPreview}
                        alt="cover preview"
                        className="h-12 w-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setEventCover(null)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Event Gallery */}
                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Gallery
                  </label>

                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#333333] rounded-lg cursor-pointer hover:border-[#F3BA18] bg-[#2d2d2d]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG (up to 10 images)
                      </p>
                    </div>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setEventImages(Array.from(e.target.files || []))
                      }
                      className="hidden"
                    />
                  </div>

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
                                setEventImages(
                                  eventImages.filter((_, idx) => idx !== i)
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
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 custom-button-two text-black rounded-md font-medium hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Adding..." : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
}

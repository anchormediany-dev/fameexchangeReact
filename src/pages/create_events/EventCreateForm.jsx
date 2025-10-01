import React, { useState, useMemo, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
  FaPhone,
  FaDollarSign,
  FaPercent,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../app/authApi";
import TalentMultiSelect from "../../components/TalentMultiSelect";

/* ---------- small inputs ---------- */
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
        title="Remove"
      >
        <IoClose size={18} />
      </button>
    </div>
  </div>
);

const PurchaseUrlInput = ({ value, onChange, onRemove, index, onOpen }) => (
  <div className="relative">
    <div className="flex items-center gap-2 border rounded-lg px-4 py-3 bg-[#2d2d2d]">
      <FaLink className="text-gray-400 shrink-0" />
      <input
        type="url"
        value={value}
        onChange={onChange}
        placeholder={`https://... (URL ${index + 1})`}
        className="bg-transparent outline-none w-full text-white placeholder-gray-400"
      />
      {/* <button
        type="button"
        onClick={onOpen}
        className="text-xs px-2 py-1 rounded border border-gray-600 hover:border-gray-400"
        title="Open link"
        disabled={!value?.trim()}
      >
        Open
      </button> */}
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors"
        title="Remove"
      >
        <IoClose size={18} />
      </button>
    </div>
  </div>
);

/* ---------- main component ---------- */
export default function EventCreateForm() {
  const navigate = useNavigate();
  const [createEvent, { isLoading }] = useCreateEventMutation();

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

    // pricing/discounts
    regular_price: "",
    discount_percent: "",
    discount_codes: [],

    // selection
    prefrence: "interested",
    talent: [],

    // tickets
    is_free: false,
    price: "",
    no_of_tickets: "",
    purchase_url: [""], // <-- ARRAY of strings
  });

  // files + previews
  const [logo, setLogo] = useState(null);
  const [eventCover, setEventCover] = useState(null);
  const [eventImages, setEventImages] = useState([]);

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

  /* ---------- handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = [
      "regular_price",
      "discount_percent",
      "price",
      "no_of_tickets",
    ];
    if (numeric.includes(name)) {
      setForm((s) => ({ ...s, [name]: value === "" ? "" : Number(value) }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleBoolean = (e) => {
    const { name, checked } = e.target;
    if (name === "is_free") {
      setForm((s) => ({
        ...s,
        is_free: checked,
        price: checked ? 0 : s.price === 0 ? "" : s.price,
        regular_price: checked ? "" : s.regular_price,
        discount_percent: checked ? "" : s.discount_percent,
        discount_codes: checked ? [] : s.discount_codes,
      }));
      return;
    }
    setForm((s) => ({ ...s, [name]: checked }));
  };

  const handleDiscountCodeChange = (idx, v) =>
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

  // purchase url helpers
  const handlePurchaseUrlChange = (idx, v) =>
    setForm((s) => {
      const next = [...s.purchase_url];
      next[idx] = v;
      return { ...s, purchase_url: next };
    });

  const addPurchaseUrl = () =>
    setForm((s) => ({ ...s, purchase_url: [...s.purchase_url, ""] }));

  const removePurchaseUrl = (idx) =>
    setForm((s) => ({
      ...s,
      purchase_url: s.purchase_url.filter((_, i) => i !== idx),
    }));

  const openPurchaseUrl = (raw) => {
    if (!raw?.trim()) return;
    try {
      const url = raw.startsWith("http") ? raw : `https://${raw}`;
      const u = new URL(url);
      window.open(u.toString(), "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Enter a valid Purchase URL");
    }
  };

  // file inputs
  const resetInput = (input) => {
    try {
      input.value = "";
    } catch {}
  };
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    resetInput(e.target);
  };
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEventCover(file);
    resetInput(e.target);
  };
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setEventImages(files);
    resetInput(e.target);
  };

  // formData
  const buildFormData = () => {
    const fd = new FormData();
    if (logo) fd.append("logo", logo);
    if (eventCover) fd.append("event_cover", eventCover);
    eventImages.forEach((f) => fd.append("event_images", f));

    const cleanPurchaseUrls = (form.purchase_url || [])
      .map((u) => (u || "").trim())
      .filter(Boolean);

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
      is_featured: String(form.is_featured),

      // pricing/discounts
      regular_price: String(form.regular_price ?? ""),
      discount_percent: String(form.discount_percent ?? ""),
      discount_codes: JSON.stringify(form.discount_codes || []),

      // selection
      prefrence: form.prefrence,
      talent: JSON.stringify(form.talent || []),

      // tickets
      is_free: String(form.is_free),
      price: String(form.is_free ? 0 : form.price ?? ""),
      no_of_tickets: String(form.no_of_tickets ?? ""),
      purchase_url: JSON.stringify(cleanPurchaseUrls),
    }).forEach(([k, v]) => fd.append(k, v));

    return fd;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = buildFormData();
      await createEvent(formData).unwrap();
      toast.success("Event created successfully!");

      setForm({
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

        prefrence: "interested",
        talent: [],

        is_free: false,
        price: "",
        no_of_tickets: "",
        purchase_url: [""],
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
  const disabledPricing = form.is_free;

  /* ---------- UI ---------- */
  return (
    <MotionPageWrapper>
      <div className="flex relative overflow-hidden">
        <div className="w-full container flex flex-col z-10">
          <div className="bg-[#222222] p-8 rounded-xl border border-[#333333]">
            <h2 className="text-white custom-heading-two mb-8">
              Create New Event
            </h2>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Basic Information</h2>

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

                <div className="md:col-span-4">
                  <TalentMultiSelect
                    value={form.talent}
                    onChange={(ids) => setForm((s) => ({ ...s, talent: ids }))}
                    placeholder="Search and select talents..."
                  />
                </div>

                <div className="flex items-center space-x-3 col-span-full">
                  <input
                    id="is_featured"
                    type="checkbox"
                    name="is_featured"
                    checked={form.is_featured}
                    onChange={handleBoolean}
                    className="rounded h-5 w-5"
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

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Location Details</h2>

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
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Ticket Details</h2>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Ticket Price{" "}
                    {form.is_free ? "(disabled for free events)" : ""}
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                      form.is_free ? "opacity-60" : ""
                    }`}
                  >
                    <FaDollarSign className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="price"
                      value={form.is_free ? 0 : form.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Per ticket price"
                      className="bg-transparent outline-none w-full text-white"
                      disabled={form.is_free}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <input
                      type="number"
                      name="no_of_tickets"
                      value={form.no_of_tickets}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      placeholder="Total tickets available"
                      className="bg-transparent outline-none w-full text-white"
                    />
                  </div>
                </div>
                {/* Multiple purchase URLs */}
                <div className="md:col-span-2 lg:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-white text-sm font-medium">
                      Purchase URLs
                    </label>
                    <span className="text-xs text-gray-500">
                      {form.purchase_url.filter((x) => x?.trim()).length} added
                    </span>
                  </div>

                  <div className="space-y-3">
                    {form.purchase_url.map((url, idx) => (
                      <PurchaseUrlInput
                        key={idx}
                        value={url}
                        index={idx}
                        onChange={(e) =>
                          handlePurchaseUrlChange(idx, e.target.value)
                        }
                        onRemove={() => removePurchaseUrl(idx)}
                        onOpen={() => openPurchaseUrl(url)}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addPurchaseUrl}
                    className="mt-3 flex items-center gap-2 text-sm gredient-text hover:underline"
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
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                    Add another purchase URL
                  </button>
                </div>{" "}
                <div className="flex items-center space-x-3">
                  <input
                    id="is_free"
                    type="checkbox"
                    name="is_free"
                    checked={form.is_free}
                    onChange={handleBoolean}
                    className="rounded h-5 w-5"
                  />
                  <label htmlFor="is_free" className="text-sm gredient-text">
                    Is this event free?
                  </label>
                </div>
              </div>

              {/* Pricing & Discounts (auto-disabled when free) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Pricing & Discounts</h2>

                <div className={disabledPricing ? "opacity-60" : ""}>
                  <label className="block text-white text-sm font-medium mb-2">
                    Regular Price*
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaDollarSign className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="regular_price"
                      value={disabledPricing ? "" : form.regular_price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Enter price"
                      className="bg-transparent outline-none w-full text-white"
                      required={!disabledPricing}
                      disabled={disabledPricing}
                    />
                  </div>
                </div>

                <div className={disabledPricing ? "opacity-60" : ""}>
                  <label className="block text-white text-sm font-medium mb-2">
                    Discount (%)
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
                    <FaPercent className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="discount_percent"
                      value={disabledPricing ? "" : form.discount_percent}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="1"
                      placeholder="Enter discount %"
                      className="bg-transparent outline-none w-full text-white"
                      disabled={disabledPricing}
                    />
                  </div>
                </div>

                <div
                  className={`md:col-span-2 lg:col-span-2 space-y-4 ${
                    disabledPricing ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-white text-sm font-medium mb-2">
                      Discount Codes
                    </label>
                    <span className="text-xs text-gray-500">
                      {form.discount_codes.length} added
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(disabledPricing ? [] : form.discount_codes).map(
                      (code, idx) => (
                        <DiscountCodeInput
                          key={idx}
                          value={code}
                          onChange={(e) =>
                            handleDiscountCodeChange(idx, e.target.value)
                          }
                          onRemove={() => removeDiscountCode(idx)}
                          index={idx}
                        />
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={addDiscountCode}
                    className="flex items-center gap-2 text-sm gredient-text hover:underline disabled:opacity-60"
                    disabled={disabledPricing}
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
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                    Add another discount code
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 gap-6">
                <h2 className={sectionTitleCls}>Content</h2>

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

              {/* Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <h2 className={sectionTitleCls}>Media</h2>

                <div>
                  <label
                    htmlFor="eventLogoInput"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group"
                  >
                    <FiUpload className="w-4 h-4 text-gray-400 group-hover:text-[#a38b41] mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-[#a38b41] transition-colors text-center">
                      Event Logo
                    </span>
                  </label>
                  <input
                    id="eventLogoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="sr-only"
                  />
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

                <div>
                  <label
                    htmlFor="eventCoverInput"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group"
                  >
                    <FiUpload className="w-4 h-4 text-gray-400 group-hover:text-[#a38b41] mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-[#a38b41] transition-colors text-center">
                      Event Cover
                    </span>
                  </label>
                  <input
                    id="eventCoverInput"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="sr-only"
                  />
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

                <div className="md:col-span-2">
                  <label
                    htmlFor="eventGalleryInput"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group"
                  >
                    <FiUpload className="w-4 h-4 text-gray-400 group-hover:text-[#a38b41] mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-[#a38b41] transition-colors text-center">
                      Event Gallery
                    </span>
                  </label>
                  <input
                    id="eventGalleryInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                    className="sr-only"
                  />
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

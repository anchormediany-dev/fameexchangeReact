import { useState, useMemo, useEffect } from "react";
import { openExternal } from "../../utils/nativeLinks";
import { FiUpload } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMapMarker,
  FaDesktop,
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

/* ---------- discount code input ---------- */
const DiscountCodeInput = ({
  discount,
  onChange,
  onRemove,
  index,
  disabled,
}) => (
  <div className="flex gap-3 items-start">
    <div className="flex-1">
      <label className="block text-white text-sm font-medium mb-2">
        Discount Code {index + 1}
      </label>
      <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
        <input
          type="text"
          value={discount.discount_codes}
          onChange={(e) => onChange(index, "discount_codes", e.target.value)}
          placeholder="e.g., SUMMER2025"
          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          disabled={disabled}
        />
      </div>
    </div>
    <div className="flex-1">
      <label className="block text-white text-sm font-medium mb-2">
        Discount Percentage
      </label>
      <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
        <FaPercent className="text-gray-400 mr-3" />
        <input
          type="number"
          value={discount.discount_percent}
          onChange={(e) =>
            onChange(
              index,
              "discount_percent",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          min="0"
          max="100"
          step="1"
          placeholder="10"
          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          disabled={disabled}
        />
      </div>
    </div>
    <div className="pt-10">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-gray-400 hover:text-red-500 transition-colors mt-1"
        title="Remove discount code"
        disabled={disabled}
      >
        <IoClose size={20} />
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
    event_type: ["live"],
    status: "active",
    category: "",
    location: "",
    address: "",
    phone: "",
    website: "",
    organizername: "",
    is_featured: true,

    // pricing/discounts - CHANGED: Now using array for multiple discounts
    // regular_price: "",
    discounts: [{ discount_percent: "", discount_codes: "" }], // Array of discount objects

    // selection
    // prefrence: "interested",
    talent: [],

    // tickets
    is_free: false,
    price: "",
    no_of_tickets: "",
    purchase_url: [""],
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
    const numeric = ["regular_price", "price", "no_of_tickets"];
    if (numeric.includes(name)) {
      setForm((s) => ({ ...s, [name]: value === "" ? "" : Number(value) }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };
  const handleEventTypeChange = (type) => {
    setForm((s) => {
      const currentTypes = s.event_type || [];

      if (currentTypes.includes(type)) {
        // Remove type if already selected (but ensure at least one remains)
        if (currentTypes.length > 1) {
          return {
            ...s,
            event_type: currentTypes.filter((t) => t !== type),
          };
        }
        return s;
      } else {
        return {
          ...s,
          event_type: [...currentTypes, type],
        };
      }
    });
  };
  const isEventTypeSelected = (type) => {
    return (form.event_type || []).includes(type);
  };

  const handleBoolean = (e) => {
    const { name, checked } = e.target;
    if (name === "is_free") {
      setForm((s) => ({
        ...s,
        is_free: checked,
        price: checked ? 0 : s.price === 0 ? "" : s.price,
        regular_price: checked ? "" : s.regular_price,
        discounts: checked
          ? []
          : s.discounts.length === 0
          ? [{ discount_percent: "", discount_codes: "" }]
          : s.discounts,
      }));
      return;
    }
    setForm((s) => ({ ...s, [name]: checked }));
  };

  // Discount code handlers
  const handleDiscountChange = (index, field, value) => {
    setForm((s) => {
      const newDiscounts = [...s.discounts];
      newDiscounts[index] = {
        ...newDiscounts[index],
        [field]: value,
      };
      return { ...s, discounts: newDiscounts };
    });
  };

  const addDiscountCode = () => {
    setForm((s) => ({
      ...s,
      discounts: [...s.discounts, { discount_percent: "", discount_codes: "" }],
    }));
  };

  const removeDiscountCode = (index) => {
    setForm((s) => ({
      ...s,
      discounts: s.discounts.filter((_, i) => i !== index),
    }));
  };

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
      openExternal(u.toString());
    } catch {
      toast.error("Enter a valid Purchase URL");
    }
  };

  // file inputs
  const resetInput = (input) => {
    try {
      input.value = "";
    } catch {
      // Some input types (e.g. file inputs in older browsers) can throw
      // when programmatically cleared — safe to ignore.
    }
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

    // Filter out empty discount objects and clean the data
    const cleanDiscounts = form.discounts
      .filter(
        (discount) =>
          discount.discount_codes?.trim() && discount.discount_percent !== ""
      )
      .map((discount) => ({
        discount_percent: Number(discount.discount_percent),
        discount_codes: discount.discount_codes.trim(),
      }));
    const eventTypes = Array.isArray(form.event_type)
      ? form.event_type
      : [form.event_type].filter(Boolean);
    const eventTypeString = eventTypes.join(",");
    Object.entries({
      datetime: form.datetime,
      title: form.title,
      summary: form.summary,
      details: form.details,
      event_type: eventTypeString,
      status: form.status,
      category: form.category,
      location: form.location,
      address: form.address,
      phone: form.phone,
      website: form.website,
      organizername: form.organizername,
      is_featured: String(form.is_featured),

      // pricing/discounts - UPDATED: Now sending array
      regular_price: String(form.regular_price ?? ""),
      discounts: JSON.stringify(cleanDiscounts), // Send as JSON string

      // selection
      // prefrence: form.prefrence,
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

      // Reset form
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
        discounts: [{ discount_percent: "", discount_codes: "" }],
        // prefrence: "interested",
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

                {/* <div>
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
                </div> */}
                {/* UPDATED: Event Type Selection */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Event Type*
                  </label>
                  <div className="space-y-3">
                    {/* Live Event Option */}
                    <div className="flex items-center">
                      <input
                        id="event-type-live"
                        type="checkbox"
                        checked={isEventTypeSelected("live")}
                        onChange={() => handleEventTypeChange("live")}
                        className="rounded h-4 w-4 text-[#F3BA18] focus:ring-[#F3BA18] border-gray-600 bg-[#2d2d2d]"
                      />
                      <label
                        htmlFor="event-type-live"
                        className={`ml-2 flex items-center gap-2 text-sm ${
                          isEventTypeSelected("live")
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <FaMapMarker className="w-3 h-3" />
                        Live Event
                      </label>
                    </div>

                    {/* Virtual Event Option */}
                    <div className="flex items-center">
                      <input
                        id="event-type-virtual"
                        type="checkbox"
                        checked={isEventTypeSelected("virtual")}
                        onChange={() => handleEventTypeChange("virtual")}
                        className="rounded h-4 w-4 text-[#F3BA18] focus:ring-[#F3BA18] border-gray-600 bg-[#2d2d2d]"
                      />
                      <label
                        htmlFor="event-type-virtual"
                        className={`ml-2 flex items-center gap-2 text-sm ${
                          isEventTypeSelected("virtual")
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <FaDesktop className="w-3 h-3" />
                        Virtual Event
                      </label>
                    </div>

                    {/* <p className="text-xs text-gray-500 mt-2">
                      Select one or both event types
                    </p> */}
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

                {/* <div>
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
                </div> */}

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

                {/* <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Regular Price
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                      disabledPricing ? "opacity-60" : ""
                    }`}
                  >
                    <FaDollarSign className="text-gray-400 mr-3" />
                    <input
                      type="number"
                      name="regular_price"
                      value={form.regular_price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Regular price"
                      className="bg-transparent outline-none w-full text-white"
                      disabled={disabledPricing}
                    />
                  </div>
                </div> */}

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Ticket Price
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d] ${
                      disabledPricing ? "opacity-60" : ""
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

                <div className="flex items-center space-x-3 col-span-full">
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

                {/* Discount Codes Section */}
                <div className="md:col-span-4 lg:col-span-4">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-white text-lg font-semibold">
                      Discount Codes
                    </label>
                    {/* <span className="text-sm text-gray-500">
                      {
                        form.discounts.filter(
                          (d) =>
                            d.discount_codes?.trim() &&
                            d.discount_percent !== ""
                        ).length
                      }{" "}
                      active
                    </span> */}
                  </div>

                  <div className="space-y-4">
                    {form.discounts.map((discount, index) => (
                      <DiscountCodeInput
                        key={index}
                        discount={discount}
                        index={index}
                        onChange={handleDiscountChange}
                        onRemove={removeDiscountCode}
                        disabled={disabledPricing}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addDiscountCode}
                    disabled={disabledPricing}
                    className={`mt-4 flex items-center gap-2 text-sm gredient-text hover:underline ${
                      disabledPricing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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

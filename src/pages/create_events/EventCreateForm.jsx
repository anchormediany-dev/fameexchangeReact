import React, { useState } from "react";

export default function EventCreateForm() {
  const [form, setForm] = useState({
    // userId: "686e3aede4826d5b99b2f812",
    datetime: "2025-08-09T15:00:00Z",
    title: "My Exclusive Event test 1",
    summary: "Quick summary of the event",
    details: "Full details here",
    event_type: "live",
    status: "active",
    category: "music",
    location: "Los Angeles",
    address: "123 LA Street",
    phone: "+1-555-1212",
    website: "https://example.com",
    organizername: "DJ Dovav Events",
    is_featured: true,
    regular_price: 100,
    discount_percent: 10,
    discount_codes: ["SUMMER2025", "VIPACCESS"],
    event_coordinates: { lat: 34.0522, long: -118.2437 },
    prefrence: "interested",
  });

  // Files
  const [logo, setLogo] = useState(null);
  const [eventCover, setEventCover] = useState(null);
  const [eventImages, setEventImages] = useState([]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "regular_price" || name === "discount_percent") {
      setForm((s) => ({ ...s, [name]: value === "" ? "" : Number(value) }));
      return;
    }
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleBoolean = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.checked }));

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

  const handleCoordsChange = (key, v) =>
    setForm((s) => ({
      ...s,
      event_coordinates:
        key === "lat"
          ? { ...s.event_coordinates, lat: Number(v) }
          : { ...s.event_coordinates, long: Number(v) },
    }));

  const handleLogo = (e) => setLogo(e.target.files?.[0] || null);
  const handleCover = (e) => setEventCover(e.target.files?.[0] || null);
  const handleImages = (e) => setEventImages(Array.from(e.target.files || []));

  // Build FormData (demo only)
  const buildFormData = () => {
    const fd = new FormData();
    if (logo) fd.append("logo", logo);
    if (eventCover) fd.append("event_cover", eventCover);
    eventImages.forEach((f) => fd.append("event_images", f));

    fd.append("userId", String(form.userId));
    fd.append("datetime", String(form.datetime));
    fd.append("title", form.title);
    fd.append("summary", form.summary);
    fd.append("details", form.details);
    fd.append("event_type", form.event_type);
    fd.append("status", form.status);
    fd.append("category", form.category);
    fd.append("location", form.location);
    fd.append("address", form.address);
    fd.append("phone", form.phone);
    fd.append("website", form.website);
    fd.append("organizername", form.organizername);
    fd.append("is_featured", String(form.is_featured));
    fd.append("regular_price", String(form.regular_price));
    fd.append("discount_percent", String(form.discount_percent));
    fd.append("prefrence", form.prefrence);
    fd.append("discount_codes", JSON.stringify(form.discount_codes || []));
    fd.append(
      "event_coordinates",
      JSON.stringify(form.event_coordinates || {})
    );
    return fd;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = buildFormData();
    // Demo: log out FormData keys/values
    const out = {};
    for (const [k, v] of fd.entries()) {
      out[k] = v instanceof File ? `File(${v.name})` : v;
    }
    console.log("FormData preview:", out);
    alert("Check console for FormData preview.");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[var(--color-white)]">
      <div className="container py-8">
        <h1
          className="custom-heading-one gredient-text"
          style={{ color: "var(--color-primary)" }}
        >
          Create Event
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT: Main details */}
          <section className="lg:col-span-2 p-5 rounded-xl bg-[#121212] shadow-inset-light">
            <h2 className="custom-heading-three mb-4 text-[var(--color-lightYellow)]">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
              <TextField
                label="Organizer Name"
                name="organizername"
                value={form.organizername}
                onChange={handleChange}
              />

              <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
              <SelectField
                label="Event Type"
                name="event_type"
                value={form.event_type}
                onChange={handleChange}
                options={[
                  { value: "live", label: "Live" },
                  { value: "virtual", label: "Virtual" },
                  { value: "hybrid", label: "Hybrid" },
                ]}
              />

              <SelectField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={[
                  { value: "active", label: "Active" },
                  { value: "draft", label: "Draft" },
                  { value: "archived", label: "Archived" },
                ]}
              />

              <TextField
                label="Preference"
                name="prefrence"
                value={form.prefrence}
                onChange={handleChange}
              />

              <TextField
                label="Location (City)"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />

              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <TextField
                label="Website"
                name="website"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Date & Time (ISO)"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                placeholder="YYYY-MM-DDTHH:mm:ssZ"
              />
              <div className="flex items-center gap-3 pt-6">
                <input
                  id="is_featured"
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleBoolean}
                  className="custom-checkbox"
                />
                <label
                  htmlFor="is_featured"
                  className="text-sm text-[var(--color-grayLabel)]"
                >
                  Mark as Featured
                </label>
              </div>
            </div>

            <div className="mt-4">
              <Label>Summary</Label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
                placeholder="Quick summary of the event"
              />
            </div>

            <div className="mt-4">
              <Label>Details</Label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
                placeholder="Full details here"
              />
            </div>
          </section>

          {/* RIGHT: Pricing & media */}
          <section className="lg:col-span-1 p-5 rounded-xl bg-[#121212] shadow-inset-light">
            <h2 className="custom-heading-three mb-4 text-[var(--color-lightYellow)]">
              Pricing & Media
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <NumberField
                label="Regular Price"
                name="regular_price"
                value={form.regular_price}
                onChange={handleChange}
                min="0"
              />
              <NumberField
                label="Discount Percent"
                name="discount_percent"
                value={form.discount_percent}
                onChange={handleChange}
                min="0"
                max="100"
              />

              <div>
                <Label>Discount Codes</Label>
                <div className="space-y-2">
                  {form.discount_codes.map((code, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => handleArrayChange(idx, e.target.value)}
                        className="flex-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
                        placeholder={`Code #${idx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeDiscountCode(idx)}
                        className="px-3 rounded-md gredient-border hover:bg-[var(--color-primary)] hover:text-black transition"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDiscountCode}
                    className="custom-button-outline mt-1"
                  >
                    Add Code
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Latitude</Label>
                  <input
                    type="number"
                    step="any"
                    value={form.event_coordinates.lat}
                    onChange={(e) => handleCoordsChange("lat", e.target.value)}
                    className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <input
                    type="number"
                    step="any"
                    value={form.event_coordinates.long}
                    onChange={(e) => handleCoordsChange("long", e.target.value)}
                    className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
                  />
                </div>
              </div>

              {/* Files */}
              <div>
                <Label>Logo (1)</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogo}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:text-black hover:file:opacity-90"
                />
                {logo && (
                  <p className="text-xs mt-1 text-[var(--color-grayLabel2)]">
                    Selected: {logo.name}
                  </p>
                )}
              </div>

              <div>
                <Label>Event Cover (1)</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCover}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:text-black hover:file:opacity-90"
                />
                {eventCover && (
                  <p className="text-xs mt-1 text-[var(--color-grayLabel2)]">
                    Selected: {eventCover.name}
                  </p>
                )}
              </div>

              <div>
                <Label>Event Images (multiple)</Label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImages}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[var(--color-primary)] file:text-black hover:file:opacity-90"
                />
                {eventImages?.length > 0 && (
                  <p className="text-xs mt-1 text-[var(--color-grayLabel2)]">
                    {eventImages.length} file
                    {eventImages.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="w-full mt-6 custom-button-two">
              Preview Payload (Console)
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

/* ---------- tiny UI helpers ---------- */
function Label({ children }) {
  return (
    <label className="block mb-2 text-sm font-medium text-[var(--color-grayLabel)]">
      {children}
    </label>
  );
}
function TextField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
      />
    </div>
  );
}
function NumberField({ label, name, value, onChange, min, max }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
      />
    </div>
  );
}
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[var(--color-primary)] outline-none px-3 py-2"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#1a1a1a]">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

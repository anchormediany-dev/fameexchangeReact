import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const REP_OPTIONS = ["agent", "business_manager", "attorney", "record_label"];

const RepresentationSection = ({ onFormChange }) => {
  const dropdownRef = useRef();
  const [hasRepresentation, setHasRepresentation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [repDetails, setRepDetails] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSelect = useCallback((type) => {
    setSelectedTypes((prevTypes) => {
      const exists = prevTypes.includes(type);
      const updated = exists
        ? prevTypes.filter((r) => r !== type)
        : [...prevTypes, type];

      // Initialize details for new selections
      setRepDetails((prevDetails) =>
        updated.map((role) => {
          const existing = prevDetails.find((r) => r.type === role);
          return (
            existing || {
              type: role,
              name: "",
              email: "",
              phone: "",
            }
          );
        })
      );

      return updated;
    });
    setIsConfirmed(false);
  }, []);

  const handleInputChange = useCallback((index, field, value) => {
    setRepDetails((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
    setIsConfirmed(false);
  }, []);

  const removeRep = useCallback((index) => {
    setSelectedTypes((prev) => {
      const updated = [...prev];
      const typeToRemove = updated[index];
      updated.splice(index, 1);

      setRepDetails((prevDetails) =>
        prevDetails.filter((r) => r.type !== typeToRemove)
      );

      return updated;
    });
    setIsConfirmed(false);
  }, []);

  const validateForm = useCallback(() => {
    return repDetails.every(
      (r) => r.name.trim() && r.phone.trim() && validateEmail(r.email)
    );
  }, [repDetails]);

  const handleConfirm = useCallback(() => {
    if (!validateForm()) {
      alert("Please complete all fields correctly for all representatives.");
      return;
    }

    setIsConfirmed(true);
    onFormChange({
      hasRepresentation: true,
      selectedRepTypes: selectedTypes,
      representatives: repDetails,
    });
  }, [validateForm, onFormChange, selectedTypes, repDetails]);

  // Handle click outside dropdown
  useEffect(() => {
    const clickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  // Reset form when representation is toggled off
  useEffect(() => {
    if (!hasRepresentation) {
      setSelectedTypes([]);
      setRepDetails([]);
      setIsConfirmed(false);
      onFormChange({
        hasRepresentation: false,
        selectedRepTypes: [],
        representatives: [],
      });
    }
  }, [hasRepresentation]); // Removed onFormChange from dependencies

  return (
    <div className="space-y-6">
      {/* Representation Toggle */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="representation"
          checked={hasRepresentation}
          onChange={(e) => setHasRepresentation(e.target.checked)}
          className="h-5 w-5 text-[#F3BA18] border-[#F3BA18] focus:ring-[#F3BA18] rounded"
        />
        <label htmlFor="representation" className="text-sm text-white">
          I am Represented
        </label>
      </div>

      {/* Dropdown */}
      {hasRepresentation && (
        <div className="relative w-full md:w-1/2" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#2d2d2d] text-white text-left rounded-lg shadow"
            disabled={isConfirmed}
          >
            <span className="truncate text-sm">
              {selectedTypes.length > 0
                ? selectedTypes
                    .map((type) =>
                      type
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    )
                    .join(", ")
                : "Select Representation Type"}
            </span>
            <FaChevronDown
              className={`transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && !isConfirmed && (
            <div className="absolute z-10 mt-1 w-full bg-[#2d2d2d] rounded-lg shadow-lg max-h-60 overflow-auto">
              {REP_OPTIONS.map((type) => (
                <div key={type} className="px-4 py-2 hover:bg-[#3d3d3d]">
                  <label className="flex items-center space-x-2 cursor-pointer text-sm text-white">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleSelect(type)}
                      className="h-4 w-4 text-[#F3BA18] border-[#F3BA18] focus:ring-[#F3BA18] rounded"
                    />
                    <span>
                      {type
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Representative Details */}
      {hasRepresentation && selectedTypes.length > 0 && (
        <div className="space-y-6 mt-2">
          {repDetails.map((rep, index) => (
            <div
              key={index}
              className="relative bg-[#1e1e1e] rounded-xl p-4 shadow space-y-3"
            >
              {!isConfirmed && (
                <button
                  type="button"
                  onClick={() => removeRep(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
                >
                  <FaTimes size={14} />
                </button>
              )}
              <h3 className="gredient-text text-sm font-semibold">
                {rep.type
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Representative
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Name*</label>
                  <input
                    type="text"
                    value={rep.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
                    placeholder="Full Name"
                    disabled={isConfirmed}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Email*</label>
                  <input
                    type="email"
                    value={rep.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
                    placeholder="Email"
                    disabled={isConfirmed}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Phone*</label>
                  <input
                    type="tel"
                    value={rep.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                    className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
                    placeholder="Phone"
                    disabled={isConfirmed}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {!isConfirmed && (
            <div className="text-right pt-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="custom-button-two text-black text-sm px-6  rounded-lg transition"
              >
                Confirm Representatives
              </button>
            </div>
          )}

          {isConfirmed && (
            <div className="text-right pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmed(false)}
                className="gredient-text text-sm px-6 py-2 rounded-lg hover:underline transition"
              >
                Edit Representatives
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(RepresentationSection);

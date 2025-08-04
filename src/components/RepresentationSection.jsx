// import React, { useRef, useState, useEffect } from "react";
// import { FaChevronDown, FaTimes } from "react-icons/fa";

// const REP_OPTIONS = [
//   "Agent",
//   "Business Manager",
//   "Attorney",
//   "Record Label",
//   "Select All",
// ];

// const RepresentationSection = ({ onSubmit }) => {
//   const dropdownRef = useRef();
//   const [hasRepresentation, setHasRepresentation] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [repDetails, setRepDetails] = useState([]);

//   const handleSelect = (type) => {
//     if (type === "Select All") {
//       const all = REP_OPTIONS.filter((r) => r !== "Select All");
//       setSelectedTypes(all);
//       setRepDetails(
//         all.map((role) => ({ role, name: "", email: "", phone: "" }))
//       );
//     } else {
//       const exists = selectedTypes.includes(type);
//       const updated = exists
//         ? selectedTypes.filter((r) => r !== type)
//         : [...selectedTypes, type];
//       setSelectedTypes(updated);
//       setRepDetails(
//         updated.map((role) => {
//           const existing = repDetails.find((r) => r.role === role);
//           return existing || { role, name: "", email: "", phone: "" };
//         })
//       );
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updated = [...repDetails];
//     updated[index][field] = value;
//     setRepDetails(updated);
//   };

//   const removeRep = (index) => {
//     const updatedTypes = [...selectedTypes];
//     updatedTypes.splice(index, 1);
//     const updatedDetails = [...repDetails];
//     updatedDetails.splice(index, 1);
//     setSelectedTypes(updatedTypes);
//     setRepDetails(updatedDetails);
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateForm = () =>
//     repDetails.every(
//       (r) => r.name.trim() && r.phone.trim() && validateEmail(r.email)
//     );

//   const handleSubmit = () => {
//     if (!validateForm()) {
//       alert("Please complete all fields correctly.");
//       return;
//     }
//     onSubmit(repDetails);
//   };

//   useEffect(() => {
//     const clickOutside = (e) => {
//       if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
//     };
//     document.addEventListener("mousedown", clickOutside);
//     return () => document.removeEventListener("mousedown", clickOutside);
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Representation Toggle */}
//       <div className="flex items-center space-x-3">
//         <input
//           type="checkbox"
//           id="representation"
//           checked={hasRepresentation}
//           onChange={(e) => {
//             setHasRepresentation(e.target.checked);
//             if (!e.target.checked) {
//               setSelectedTypes([]);
//               setRepDetails([]);
//             }
//           }}
//           className="h-5 w-5 text-[#F3BA18] border-[#F3BA18] focus:ring-[#F3BA18] rounded"
//         />
//         <label htmlFor="representation" className="text-sm text-white">
//           I am Represented
//         </label>
//       </div>

//       {/* Dropdown */}
//       {hasRepresentation && (
//         <div className="relative w-full md:w-1/2" ref={dropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="w-full flex items-center justify-between px-4 py-2 bg-[#2d2d2d] text-white text-left rounded-lg shadow"
//           >
//             <span className="truncate text-sm">
//               {selectedTypes.length > 0
//                 ? selectedTypes.join(", ")
//                 : "Select Representation Type"}
//             </span>
//             <FaChevronDown
//               className={`transition-transform ${
//                 showDropdown ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {showDropdown && (
//             <div className="absolute z-10 mt-1 w-full bg-[#2d2d2d] rounded-lg shadow-lg max-h-60 overflow-auto">
//               {REP_OPTIONS.map((type) => (
//                 <div key={type} className="px-4 py-2 hover:bg-[#3d3d3d]">
//                   <label className="flex items-center space-x-2 cursor-pointer text-sm text-white">
//                     <input
//                       type="checkbox"
//                       checked={selectedTypes.includes(type)}
//                       onChange={() => handleSelect(type)}
//                       className="h-4 w-4 text-[#F3BA18] border-[#F3BA18] focus:ring-[#F3BA18] rounded"
//                     />
//                     <span>
//                       {type === "Select All" ? "All of the Above" : type}
//                     </span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Representative Details */}
//       {selectedTypes.length > 0 && (
//         <div className="space-y-6 mt-2">
//           {repDetails.map((rep, index) => (
//             <div
//               key={index}
//               className="relative bg-[#1e1e1e] rounded-xl p-4 shadow space-y-3"
//             >
//               <button
//                 type="button"
//                 onClick={() => removeRep(index)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
//               >
//                 <FaTimes size={14} />
//               </button>
//               <h3 className="text-[#F3BA18] text-sm font-semibold">
//                 {rep.role} Representative
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
//                 <div className="flex flex-col">
//                   <label className="text-gray-400 mb-1">Name*</label>
//                   <input
//                     type="text"
//                     value={rep.name}
//                     onChange={(e) =>
//                       handleInputChange(index, "name", e.target.value)
//                     }
//                     className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
//                     placeholder="Full Name"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-gray-400 mb-1">Email*</label>
//                   <input
//                     type="email"
//                     value={rep.email}
//                     onChange={(e) =>
//                       handleInputChange(index, "email", e.target.value)
//                     }
//                     className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="text-gray-400 mb-1">Phone*</label>
//                   <input
//                     type="tel"
//                     value={rep.phone}
//                     onChange={(e) =>
//                       handleInputChange(index, "phone", e.target.value)
//                     }
//                     className="p-2 rounded bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-[#F3BA18]"
//                     placeholder="Phone"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="text-right pt-2">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="bg-[#F3BA18] text-black text-sm px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
//             >
//               Confirm Representatives
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RepresentationSection;
import React, { useRef, useState, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

const REP_OPTIONS = ["agent", "business_manager", "attorney", "record_label"];

const RepresentationSection = ({ onFormChange }) => {
  const dropdownRef = useRef();
  const [hasRepresentation, setHasRepresentation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [repDetails, setRepDetails] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSelect = (type) => {
    const exists = selectedTypes.includes(type);
    const updated = exists
      ? selectedTypes.filter((r) => r !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updated);

    // Initialize details for new selections
    const updatedDetails = updated.map((role) => {
      const existing = repDetails.find((r) => r.type === role);
      return (
        existing || {
          type: role,
          name: "",
          email: "",
          phone: "",
        }
      );
    });

    setRepDetails(updatedDetails);
    setIsConfirmed(false);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...repDetails];
    updated[index][field] = value;
    setRepDetails(updated);
    setIsConfirmed(false);
  };

  const removeRep = (index) => {
    const updatedTypes = [...selectedTypes];
    const typeToRemove = updatedTypes[index];
    updatedTypes.splice(index, 1);

    const updatedDetails = repDetails.filter((r) => r.type !== typeToRemove);

    setSelectedTypes(updatedTypes);
    setRepDetails(updatedDetails);
    setIsConfirmed(false);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    return repDetails.every(
      (r) => r.name.trim() && r.phone.trim() && validateEmail(r.email)
    );
  };

  const handleConfirm = () => {
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
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

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
  }, [hasRepresentation, onFormChange]);

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
              <h3 className="text-[#F3BA18] text-sm font-semibold">
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
                className="bg-[#F3BA18] text-black text-sm px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
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
                className="text-[#F3BA18] text-sm px-6 py-2 rounded-lg hover:underline transition"
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

export default RepresentationSection;

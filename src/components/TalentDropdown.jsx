import { useRef, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const talentOptions = [
  {
    label: "Athlete",
    value: "Athlete",
    subcategories: [
      "Baseball",
      "Basketball",
      "Football",
      "Soccer",
      "Tennis",
      "Golf",
      "Hockey",
      "Swimming",
      "Track & Field",
      "Volleyball",
      "Wrestling",
      "MMA",
      "Boxing",
      "Cycling",
      "Skateboarding",
      "Snowboarding",
      "Surfing",
      "Gymnastics",
      "Lacrosse",
      "Rugby",
      "Fencing",
      "Rowing",
      "Archery",
      "Weightlifting",
      "Table Tennis",
      "Badminton",
      "Diving",
      "Equestrian",
      "Judo",
      "Taekwondo",
    ],
  },
  {
    label: "Actor",
    value: "Actor",
    subcategories: [
      "Film",
      "Television",
      "Theater",
      "Voice Acting",
      "Commercial",
    ],
  },
  {
    label: "Model",
    value: "Model",
    subcategories: [
      "Fashion",
      "Commercial",
      "Runway",
      "Fitness",
      "Plus Size",
    ],
  },
  {
    label: "Musician",
    value: "Musician",
    subcategories: [
      "Pop",
      "Rock",
      "Hip Hop",
      "R&B",
      "Country",
      "Electronic",
      "Jazz",
      "Classical",
      "Latin",
    ],
  },
  { label: "Band", value: "Band" },
  {
    label: "Entertainer",
    value: "Entertainer",
    subcategories: [
      "Stand-up Comedy",
      "Improv",
      "Magic",
      "Variety",
      "DJ",
    ],
  },
  { label: "Brand Ambassador", value: "Brand Ambassador" },
  { label: "Host", value: "Host" },
  { label: "Social Media Influencer", value: "Social Media Influencer" },
  { label: "Spokesperson", value: "Spokesperson" },
];

const TalentDropdown = ({ onFormChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMain, setSelectedMain] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [openSub, setOpenSub] = useState(null);
  const dropdownRef = useRef(null);

  const toggleMain = (value, e) => {
    if (e.target.type === "checkbox") return;
    const selectedCategory = talentOptions.find((t) => t.value === value);
    if (selectedCategory?.subcategories?.length > 0) {
      setOpenSub(openSub === value ? null : value);
    }
  };

  const handleCheckboxChange = (value) => {
    const selected = selectedMain.includes(value);
    const updatedMain = selected
      ? selectedMain.filter((v) => v !== value)
      : [...selectedMain, value];
    setSelectedMain(updatedMain);

    const hasSubs = talentOptions.find((t) => t.value === value)?.subcategories
      ?.length;
    if (!selected && hasSubs) setOpenSub(value);
    else if (selected) setOpenSub(null);
  };

  const toggleSub = (value) => {
    setSelectedSubs((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSelectAllMain = () => {
    const allMain = talentOptions.map((t) => t.value);
    setSelectedMain((prev) => (prev.length === allMain.length ? [] : allMain));
  };

  const toggleSelectAllSub = (mainVal) => {
    const subs = getSubOptions(mainVal);
    const isAllSelected = subs.every((s) => selectedSubs.includes(s));
    setSelectedSubs((prev) =>
      isAllSelected
        ? prev.filter((s) => !subs.includes(s))
        : [...prev, ...subs.filter((s) => !prev.includes(s))]
    );
  };

  const getSubOptions = (mainVal) =>
    talentOptions.find((t) => t.value === mainVal)?.subcategories || [];

  useEffect(() => {
    const formData = {
      talents: selectedMain,
      subTalents: selectedSubs,
    };
    onFormChange(formData);
  }, [selectedMain, selectedSubs]);

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setShowDropdown(false);
        setOpenSub(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center justify-between rounded-lg px-3 py-3 bg-[#2d2d2d] text-white text-left"
      >
        <span>What's Your Talent(s)</span>
        <FaChevronDown
          className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
        />
      </button>

      {showDropdown && (
        <div className="absolute mt-2 w-full sm:w-[400px] bg-[#2d2d2d] text-white rounded-lg shadow-lg z-50 p-2">
          <div className="px-2 py-1 hover:bg-[#3d3d3d] rounded">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={selectedMain.length === talentOptions.length}
                onChange={toggleSelectAllMain}
                className="form-checkbox h-5 w-5 text-[#F3BA18] border-[#F3BA18] bg-transparent"
              />
              Select All Categories
            </label>
          </div>

          {talentOptions.map((talent) => (
            <div key={talent.value} className="relative group mb-1">
              <div
                className="px-2 py-1 hover:bg-[#3d3d3d] rounded w-full flex items-center gap-2 cursor-pointer"
                onClick={(e) => toggleMain(talent.value, e)}
              >
                <input
                  type="checkbox"
                  checked={selectedMain.includes(talent.value)}
                  onChange={() => handleCheckboxChange(talent.value)}
                  className="form-checkbox h-5 w-5 text-[#F3BA18] border-[#F3BA18] bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
                <span>{talent.label}</span>
              </div>

              {openSub === talent.value && talent.subcategories?.length > 0 && (
                <div className="mt-2 md:absolute md:left-full md:top-0 md:ml-2 w-full md:w-[250px] bg-[#2d2d2d] text-white p-2 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="px-2 py-1 hover:bg-[#3d3d3d] rounded">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
                      <input
                        type="checkbox"
                        checked={getSubOptions(talent.value).every((s) =>
                          selectedSubs.includes(s)
                        )}
                        onChange={() => toggleSelectAllSub(talent.value)}
                        className="form-checkbox h-4 w-4 text-[#F3BA18] border-[#F3BA18] bg-transparent"
                      />
                      Select All {talent.label} Subcategories
                    </label>
                  </div>
                  {talent.subcategories.map((sub) => (
                    <div
                      key={sub}
                      className="px-2 py-1 hover:bg-[#3d3d3d] rounded text-sm"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubs.includes(sub)}
                          onChange={() => toggleSub(sub)}
                          className="form-checkbox h-4 w-4 text-[#F3BA18] border-[#F3BA18] bg-transparent"
                        />
                        {sub}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TalentDropdown;

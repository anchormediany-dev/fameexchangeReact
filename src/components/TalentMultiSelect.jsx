import { useMemo, useState } from "react";
import { useGetTalentQuery } from "../app/authApi";
const TalentMultiSelect = ({ value = [], onChange, placeholder, disabled }) => {
  const { data: talents, isLoading, isError } = useGetTalentQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const list = talents?.taleUsers || [];

  // Map for quick lookup
  const byId = useMemo(() => {
    const m = new Map();
    list.forEach((t) => m.set(t._id, t));
    return m;
  }, [list]);

  // Selected talent objects (to render chips)
  const selectedTalents = useMemo(
    () => value.map((id) => byId.get(id)).filter(Boolean),
    [value, byId]
  );

  // Filter by search
  const filteredTalents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const base = term
      ? list.filter((t) => t?.name?.toLowerCase().includes(term))
      : list;
    return base;
  }, [list, searchTerm]);

  const selectId = (id) => {
    if (!value.includes(id)) onChange?.([...value, id]);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const removeId = (id) => {
    onChange?.(value.filter((x) => x !== id));
  };

  return (
    <div className="relative w-full">
      <label className="block text-white text-sm font-medium mb-2">
        Select Talents*
      </label>

      {/* Input + chips */}
      <div
        className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-[#2d2d2d] border-[#333333] text-white cursor-text
          ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : "focus-within:ring-2 focus-within:ring-[#F3BA18]"
          }`}
        onClick={() => !disabled && setIsDropdownOpen(true)}
      >
        {selectedTalents.map((t) => (
          <div
            key={t._id}
            className="flex items-center gap-2 bg-[#1f1f1f] text-gray-200 border border-[#444] px-3 py-1 rounded-full"
          >
            <span className="truncate max-w-[140px]">{t.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeId(t._id);
              }}
              className="ml-1 text-gray-400 hover:text-red-400 transition-colors"
              aria-label={`Remove ${t.name}`}
            >
              &times;
            </button>
          </div>
        ))}

        <input
          type="text"
          value={searchTerm}
          disabled={disabled}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            !disabled && setIsDropdownOpen(true);
          }}
          placeholder={
            selectedTalents.length === 0
              ? placeholder || "Search talents..."
              : ""
          }
          className="flex-grow min-w-[120px] bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && !disabled && (
        <div className="absolute z-20 w-full mt-1 bg-[#222222] border border-[#333333] rounded-lg shadow-xl max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-3 text-gray-400">Loading talents...</div>
          ) : isError ? (
            <div className="p-3 text-red-400">Error loading talents</div>
          ) : filteredTalents.length === 0 ? (
            <div className="p-3 text-gray-400">No talents found</div>
          ) : (
            filteredTalents.map((t) => {
              const isSelected = value.includes(t._id);
              return (
                <div
                  key={t._id}
                  onClick={() => selectId(t._id)}
                  className={`p-3 cursor-pointer transition-colors
                    ${isSelected ? "bg-[#2a2a2a]" : "hover:bg-[#2d2d2d]"}`}
                >
                  <div className="text-white font-medium">{t.name}</div>
                  {/* <div className="text-xs text-gray-400">
                    {t.talent?.map((x) => x.category).join(", ")}
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Click-away to close */}
      {isDropdownOpen && !disabled && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Small helper */}
      <p className="mt-1 text-xs text-gray-400">
        Selected: {value.length} talent{value.length === 1 ? "" : "s"}
      </p>
    </div>
  );
};

export default TalentMultiSelect;

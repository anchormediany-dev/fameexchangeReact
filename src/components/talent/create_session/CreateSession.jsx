import { useForm } from "react-hook-form";
import { useState } from "react";
import moment from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCreateSessionMutation } from "../../../app/authApi";
import { toast } from "react-toastify";
const ANCHORAGE_CANONICAL = "America/Anchorage";
const DEFAULT_TZ = moment.tz.zone("US/Alaska")
  ? "US/Alaska"
  : ANCHORAGE_CANONICAL;

const allZones = moment.tz.names();
const timeZones = [DEFAULT_TZ, ...allZones.filter((z) => z !== DEFAULT_TZ)];

const localizer = momentLocalizer(moment);

const CreateSession = () => {
  const [createSession, { isLoading, error }] = useCreateSessionMutation();

  // State for access types with prices
  const [accessTypes, setAccessTypes] = useState({
    Metaverse: { selected: false, price: "" },
    Virtual: { selected: false, price: "" },
    Facetime: { selected: false, price: "" },
    Hologram: { selected: false, price: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sessionLength: 30,
      bufferTime: 15,
      timeZone: DEFAULT_TZ,
      where: "",
      sessionDate: "",
      sessionTime: "",
    },
  });

  const handleAccessTypeChange = (type, field, value) => {
    setAccessTypes(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const onSubmit = async (data) => {
    try {
      // Build accessType array from selected options
      const accessTypeArray = Object.entries(accessTypes)
        .filter(([type, config]) => config.selected && config.price)
        .map(([type, config]) => ({
          type,
          price: parseFloat(config.price)
        }));

      // Validate at least one access type is selected
      if (accessTypeArray.length === 0) {
        toast.error("Please select at least one access type with a price");
        return;
      }

      const sessionData = {
        sessionLength: data.sessionLength,
        sessionDate: data.sessionDate,
        sessionTime: data.sessionTime,
        bufferTime: data.bufferTime,
        timeZone: data.timeZone,
        accessType: accessTypeArray,
        where: data.where,
      };

      await createSession(sessionData).unwrap();

      toast.success("Session created successfully!");
      reset();
      // Reset access types
      setAccessTypes({
        Metaverse: { selected: false, price: "" },
        Virtual: { selected: false, price: "" },
        Facetime: { selected: false, price: "" },
        Hologram: { selected: false, price: "" },
      });
    } catch (err) {
      const errorMessage =
        error?.data?.message ||
        err?.data?.message ||
        "Failed to create session";
      toast.error(errorMessage);
      console.error("Session creation error:", err);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const validateFutureDate = (dateString) => {
    if (!dateString) return "Session date is required";
    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateString);
    return selectedDate >= todayObj || "Date must be today or in the future";
  };

  return (
    <section className="flex container flex-col gap-4" id="create-session">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary2">
            INVERSE Meet & Greet
          </h1>
          <p className="text-gray-400 mt-1">
            Configure your availability for fans
          </p>
        </div>
      </div>

      <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow space-y-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Create Session
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Length */}
            <div>
              <label className="block text-sm text-white mb-2">
                Session Length (minutes)
              </label>
              <select
                {...register("sessionLength", {
                  required: "Session length is required",
                  validate: (value) =>
                    value > 0 || "Session length must be greater than 0",
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {[15, 30, 45, 60].map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              {errors.sessionLength && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sessionLength.message}
                </p>
              )}
            </div>

            {/* Meeting Location */}
            <div>
              <label className="block text-sm text-white mb-2">
                Meeting Location
              </label>
              <input
                type="text"
                {...register("where", {
                  required: "Meeting Location is required",
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4 placeholder-gray-400"
              />
              {errors.where && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.where.message}
                </p>
              )}
            </div>

            {/* Access Type with Prices */}
            <div className="md:col-span-2">
              <label className="block text-sm text-white mb-3">
                Access Types & Pricing ($)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(accessTypes).map(([type, config]) => (
                  <div key={type} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333333]">
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={config.selected}
                        onChange={(e) => handleAccessTypeChange(type, 'selected', e.target.checked)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                        id={`access-${type}`}
                      />
                      <label htmlFor={`access-${type}`} className="text-white font-medium cursor-pointer">
                        {type}
                      </label>
                    </div>
                    <input
                      type="number"
                      placeholder="Price"
                      value={config.price}
                      onChange={(e) => handleAccessTypeChange(type, 'price', e.target.value)}
                      disabled={!config.selected}
                      min="1"
                      max="1000"
                      className={`w-full bg-[#2d2d2d] text-white rounded-lg py-2 px-3 placeholder-gray-400 ${
                        !config.selected ? 'opacity-50 cursor-not-allowed' : 'gredient-border'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Session Date */}
            <div>
              <label className="block text-sm text-white mb-2">
                Session Date
              </label>
              <input
                type="date"
                {...register("sessionDate", { validate: validateFutureDate })}
                min={today}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              />
              {errors.sessionDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sessionDate.message}
                </p>
              )}
            </div>

            {/* Session Time */}
            <div>
              <label className="block text-sm text-white mb-2">
                Session Time
              </label>
              <input
                type="time"
                {...register("sessionTime", {
                  required: "Session time is required",
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              />
              {errors.sessionTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sessionTime.message}
                </p>
              )}
            </div>

            {/* Buffer Time */}
            <div>
              <label className="block text-sm text-white mb-2">
                Buffer Time (minutes)
              </label>
              <select
                {...register("bufferTime", {
                  required: "Buffer time is required",
                  validate: (value) =>
                    value > 0 || "Buffer time must be greater than 0",
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {[5, 10, 15, 20, 30].map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              {errors.bufferTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bufferTime.message}
                </p>
              )}
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm text-white mb-2">Time Zone</label>
              <select
                {...register("timeZone", { required: "Time zone is required" })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone === DEFAULT_TZ ? `${zone} (default)` : zone}
                  </option>
                ))}
              </select>
              {errors.timeZone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.timeZone.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="custom-button-two w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Session"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateSession;

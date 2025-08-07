import { useForm } from "react-hook-form";
import moment from "moment-timezone";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCreateSessionMutation } from "../../../app/authApi";
import { toast } from "react-toastify";

const timeZones = moment.tz.names();
const localizer = momentLocalizer(moment);

const CreateSession = () => {
  const [createSession, { isLoading, error }] = useCreateSessionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sessionLength: 30,
      price: "50",
      bufferTime: 15,
      timeZone: moment.tz.guess(),
      accessType: "Browser",
      // isActive: false,
      sessionDate: "",
      sessionTime: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const sessionData = {
        sessionLength: data.sessionLength,
        price: data.price,
        bufferTime: data.bufferTime,
        timeZone: data.timeZone,
        accessType: data.accessType,
        sessionDate: data.sessionDate,
        sessionTime: data.sessionTime,
      };

      const result = await createSession(sessionData).unwrap();

      toast.success("Session created successfully!");
      reset();
    } catch (err) {
      // Handle RTK Query error
      const errorMessage =
        error?.data?.message ||
        err?.data?.message ||
        "Failed to create session";
      toast.error(errorMessage);
      console.error("Session creation error:", err);
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Validate date is today or in the future
  const validateFutureDate = (dateString) => {
    if (!dateString) return "Session date is required";

    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateString);
    return selectedDate >= todayObj || "Date must be today or in the future";
  };

  return (
    <section className="flex container flex-col gap-4">
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

            {/* Price */}
            <div>
              <label className="block text-sm text-white mb-2">
                Price per Session ($)
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Minimum price is $1" },
                  max: { value: 1000, message: "Maximum price is $1000" },
                  valueAsNumber: true,
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4 placeholder-gray-400"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Session Date */}
            <div>
              <label className="block text-sm text-white mb-2">
                Session Date
              </label>
              <input
                type="date"
                {...register("sessionDate", {
                  validate: validateFutureDate,
                })}
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
                {...register("timeZone", {
                  required: "Time zone is required",
                })}
                className="w-full bg-[#2d2d2d] gredient-border text-white rounded-lg py-3 px-4"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
              {errors.timeZone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.timeZone.message}
                </p>
              )}
            </div>

            {/* Access Type */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm text-white mb-2">
                Access Type
              </label>
              <div className="flex gap-4">
                {["VR", "Browser"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={type}
                      {...register("accessType", {
                        required: "Access type is required",
                      })}
                      className="gredient-text bg-transparent"
                    />
                    <span className="capitalize text-white">
                      {type === "VR" ? "VR" : "Browser"} Access
                    </span>
                  </label>
                ))}
              </div>
              {errors.accessType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accessType.message}
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

// src/pages/UpdateProfile.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link /*, useNavigate*/ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MotionPageWrapper from "../components/MotionPageWrapper";
import siteLogo from "../assets/images/site-logo.png";
import TalentDropdown from "../components/TalentDropdown";
import RepresentationSection from "../components/RepresentationSection";
import SocialConnectionsPanel from "../components/SocialConnectionsPanel";
import { imgSrc } from "../utils/imgSrc";
import {
  useGetUserByIdQuery,
  useUpdateMyProfileMutation,
  useDeleteProfileImageMutation,
} from "../app/authApi";
import { HiBadgeCheck } from "react-icons/hi";
import {
  FaShieldAlt,
  FaSave,
  FaInfoCircle,
  FaUserAlt,
  FaUserCog,
  FaLink,
  FaImages,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

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
    ],
  },
  { label: "Actor", value: "Actor" },
  { label: "Model", value: "Model" },
  { label: "Musician", value: "Musician" },
  { label: "Band", value: "Band" },
  { label: "Entertainer", value: "Entertainer" },
  { label: "Brand Ambassador", value: "Brand Ambassador" },
  { label: "Host", value: "Host" },
  { label: "Social Media Rep", value: "Social Media Rep" },
  { label: "Spokesperson", value: "Spokesperson" },
];

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s?.auth?.user?.id);

  // get user + expose refetch so UI updates after uploads/deletes
  const {
    data: userResp,
    isFetching,
    refetch,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
  const user = userResp?.user;

  const [updateMyProfile, { isLoading: isSaving }] =
    useUpdateMyProfileMutation();
  const [deleteProfileImage, { isLoading: isDeleting }] =
    useDeleteProfileImageMutation();

  const [newImages, setNewImages] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // object URLs

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      biography: "",
      is_active: true,
      token_brand_name: "",
      token_name: "",
      networth: "",
      is_rep_have: false,
      rep_type: "",
      representation: [],
      talent: [],
      images: "", // hidden field to track dirtiness when files change
    },
  });

  const roleFromAPI = user?.role || "FAN";
  const isTalent = roleFromAPI === "TALENT";

  useEffect(() => {
    if (!user) return;
    const repTypeSeed =
      user?.rep_type ??
      (Array.isArray(user?.selected_reps) ? user.selected_reps.join(",") : "");
    reset({
      name: user?.name || "",
      password: "",
      biography: user?.biography || "",
      is_active: !!user?.is_active,
      token_brand_name: user?.token_brand_name || "",
      token_name: user?.token_name || "",
      networth: user?.networth ?? "",
      is_rep_have: !!user?.is_rep_have,
      rep_type: repTypeSeed,
      representation: user?.representation || [],
      talent: user?.talent || [],
      images: "",
    });
    // clear local uploads
    newImages.forEach(
      (_, i) => previews[i] && URL.revokeObjectURL(previews[i])
    );
    setNewImages([]);
    setPreviews([]);
  }, [user, reset]);

  // ---------- Talent & Representation ----------
  const handleTalentChange = (data) => {
    const formatted = (data?.talents || []).map((val) => {
      const opt = talentOptions.find((o) => o.value === val);
      const subs = (opt?.subcategories || []).filter((s) =>
        (data?.subTalents || []).includes(s)
      );
      return { category: opt?.label || val, subcategory: subs };
    });
    setValue("talent", formatted, { shouldDirty: true });
  };

  const handleRepresentationChange = (data) => {
    setValue("is_rep_have", !!data?.hasRepresentation, { shouldDirty: true });
    setValue("rep_type", (data?.selectedRepTypes || []).join(","), {
      shouldDirty: true,
    });
    setValue("representation", data?.representatives || [], {
      shouldDirty: true,
    });
  };

  // ---------- Images ----------
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) return;

    const urls = files.map((f) => URL.createObjectURL(f));
    // cleanup old
    previews.forEach((u) => URL.revokeObjectURL(u));

    setNewImages(files);
    setPreviews(urls);

    // mark form dirty via a hidden registered field
    setValue("images", files.map((f) => f.name).join(","), {
      shouldDirty: true,
    });
  };

  const handleRemoveNewImage = (index) => {
    const files = [...newImages];
    const urls = [...previews];
    files.splice(index, 1);
    const removed = urls.splice(index, 1)[0];
    if (removed) URL.revokeObjectURL(removed);

    setNewImages(files);
    setPreviews(urls);

    // keep RHF dirty if any files remain, else clear
    setValue("images", files.map((f) => f.name).join(","), {
      shouldDirty: true,
    });
  };

  const handleRemoveExistingImage = async (imageDoc) => {
    try {
      await deleteProfileImage(imageDoc?._id).unwrap();
      toast.success("Image deleted.");
      await refetch(); // refresh the “Existing” section
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete image");
    }
  };

  // ---------- Build payload ----------
  const buildFormData = (vals) => {
    const fd = new FormData();
    if (vals?.name) fd.append("name", vals.name);
    if (vals?.password) fd.append("password", vals.password);
    fd.append("biography", vals?.biography || "");
    fd.append("is_active", String(!!vals?.is_active));

    // from GET
    fd.append("usertype", roleFromAPI || "any");
    fd.append("datetime", new Date().toISOString());
    fd.append("google_login_id", user?.google_login_id || "");
    fd.append("is_login_google", String(!!user?.is_login_google));
    fd.append("is_login_facebook", String(!!user?.is_login_facebook));
    fd.append("facebook_login_id", user?.facebook_login_id || "");

    // social links are read-only; send what backend has
    fd.append("social_youtube", user?.social_youtube || "");
    fd.append("social_twitter", user?.social_twitter || "");
    fd.append("social_tiktok", user?.social_tiktok || "");
    fd.append("social_facebook", user?.social_facebook || "");
    fd.append("social_insta", user?.social_insta || "");
    fd.append("social_snap", user?.social_snap || "");

    // tokens & worth
    fd.append("token_brand_name", vals?.token_brand_name || "");
    fd.append("token_name", vals?.token_name || "");
    if (
      vals?.networth !== undefined &&
      vals?.networth !== null &&
      vals?.networth !== ""
    ) {
      fd.append("networth", String(vals.networth));
    }

    // representation
    fd.append("is_rep_have", String(!!vals?.is_rep_have));
    fd.append("rep_type", vals?.rep_type || "");
    fd.append(
      "representation",
      JSON.stringify(
        Array.isArray(vals?.representation) ? vals.representation : []
      )
    );

    // talent only if role is TALENT
    if (isTalent) {
      fd.append("talent", JSON.stringify(vals?.talent || []));
    }

    // NEW uploads
    // if your backend prefers images[], switch key to "images[]"
    newImages.forEach((file) => fd.append("images", file));

    return fd;
  };

  const onSubmit = async (values) => {
    try {
      const formData = buildFormData(values);
      const res = await updateMyProfile(formData).unwrap();

      // if (res?.user || res?.token) {
      //   const cur = {
      //     id: res?.user?._id || userId,
      //     email: res?.user?.email || user?.email,
      //     is_verified: res?.user?.is_verified ?? user?.is_verified,
      //     KYC_Verified: res?.user?.KYC_Verified ?? user?.KYC_Verified,
      //   };
      //   dispatch(
      //     setCredentials({ accessToken: res?.token || null, user: cur })
      //   );
      // }

      toast.success("Profile updated successfully.");

      // clear local uploads + refresh gallery
      newImages.forEach(
        (_, i) => previews[i] && URL.revokeObjectURL(previews[i])
      );
      setNewImages([]);
      setPreviews([]);
      setValue("images", "", { shouldDirty: false });

      await refetch();
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to update profile."
      );
    }
  };

  const hasPendingUploads = newImages.length > 0;
  const disabled = isFetching || isSaving || isDeleting;

  return (
    <MotionPageWrapper>
      {/* dropdown scrollbar styles */}
      <style>{`
        .fx-scroll-menu .react-select__menu-list,
        .fx-scroll-menu [role="listbox"],
        .fx-scroll-menu .dropdown-menu,
        .fx-scroll-menu .menu { max-height: 16rem; overflow-y: auto; }
        .fx-scroll-menu ::-webkit-scrollbar { width: 8px; }
        .fx-scroll-menu ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 8px; }
        .fx-scroll-menu { scrollbar-width: thin; scrollbar-color: #4b5563 transparent; }
      `}</style>

      <div className="flex mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 relative bg-[#171717] overflow-hidden">
        <div className="w-full container flex flex-col-reverse lg:flex-row gap-8 z-10">
          <div className="lg:w-[70%]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] border border-[#333] rounded-2xl p-6 mb-6 shadow">
              <div className="flex items-center gap-3">
                <FaUserAlt className="w-5 h-5 text-white/80" />
                <h2 className="text-white text-xl font-semibold">
                  Update Your Profile
                </h2>
                <span className="ml-auto inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#222] border border-[#333] text-white/80">
                  <HiBadgeCheck className="w-4 h-4" /> Role:{" "}
                  <b>{roleFromAPI}</b>
                </span>
              </div>
              {(isDirty || hasPendingUploads) && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-300">
                  <FaInfoCircle className="w-4 h-4" />
                  You have unsaved changes.
                </div>
              )}
            </div>

            {/* FORM (manual submit only) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.tagName !== "TEXTAREA")
                  e.preventDefault();
              }}
              className="space-y-8"
            >
              {/* hidden registered field so images changes toggle isDirty */}
              <input type="hidden" {...register("images")} />

              {/* Basic Info */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaUserCog className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">Basic Info</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 text-sm mb-2">
                      Name*
                    </label>
                    <input
                      className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                      placeholder="Your Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                      placeholder="••••••"
                      {...register("password", {
                        minLength: { value: 6, message: "Min 6 characters" },
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-white/90 text-sm mb-2">
                    Biography
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                    placeholder="Tell us about yourself..."
                    {...register("biography")}
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#F3BA18]"
                    {...register("is_active")}
                  />
                  <span className="text-sm text-white/80">Active</span>
                </div>
              </section>

              {/* Representation */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaShieldAlt className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">Representation</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-[#F3BA18]"
                      {...register("is_rep_have")}
                    />
                    <span className="text-sm text-white/80">
                      I have representation
                    </span>
                  </div>
                  <div>
                    <label className="block text-white/90 text-sm mb-2">
                      Rep Type (comma separated)
                    </label>
                    <input
                      className="w-full bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                      placeholder="agent, manager"
                      {...register("rep_type")}
                    />
                  </div>
                </div>
                <div className="mt-4 fx-scroll-menu">
                  <RepresentationSection
                    onFormChange={handleRepresentationChange}
                  />
                </div>
              </section>
              {/* Talent (TALENT only) */}
              {isTalent && (
                <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <HiBadgeCheck className="w-5 h-5 text-white/70" />
                    <h3 className="text-white font-semibold">Talent</h3>
                  </div>
                  <div className="fx-scroll-menu">
                    <TalentDropdown onFormChange={handleTalentChange} />
                  </div>
                </section>
              )}
              {/* Connected Accounts */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaLink className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">
                    Connected Accounts
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between bg-[#202020] rounded-lg px-4 py-3 border border-[#2b2b2b]">
                    <span className="text-white/80">Google</span>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user?.is_login_google
                          ? "bg-emerald-600/20 text-emerald-300"
                          : "bg-zinc-700/40 text-zinc-300"
                      }`}
                    >
                      {user?.is_login_google ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-[#202020] rounded-lg px-4 py-3 border border-[#2b2b2b]">
                    <span className="text-white/80">Facebook</span>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user?.is_login_facebook
                          ? "bg-emerald-600/20 text-emerald-300"
                          : "bg-zinc-700/40 text-zinc-300"
                      }`}
                    >
                      {user?.is_login_facebook ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Connected Accounts (OAuth verify + follower fetch → social_worth) */}
              <SocialConnectionsPanel />

              {/* Social Links (read-only) */}
              <section className="bg-[#141414] border border-[#242424] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaLink className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">Social Links</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "YouTube", value: user?.social_youtube },
                    { label: "X", value: user?.social_twitter },
                    { label: "TikTok", value: user?.social_tiktok },
                    { label: "Facebook", value: user?.social_facebook },
                    { label: "Instagram", value: user?.social_insta },
                    { label: "Snapchat", value: user?.social_snap },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#2a2a2a]"
                    >
                      <span className="text-white/80">{s.label}</span>
                      {s.value ? (
                        <a
                          href={s.value}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#F3BA18] hover:underline truncate max-w-[60%] text-right"
                        >
                          {s.value}
                        </a>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Images */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaImages className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">Images</h3>
                </div>

                {/* Existing */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 mb-2">Existing</p>
                  {Array.isArray(user?.images) && user.images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {user.images.map((img) => (
                        <div
                          key={img?._id}
                          className="relative aspect-square rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#111] group"
                        >
                          <img
                            src={imgSrc(img?.fileUrl)}
                            alt="uploaded"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(img)}
                            className="absolute top-1 right-1 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                            title="Remove"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-white/50 text-sm">
                      No images uploaded yet.
                    </div>
                  )}
                </div>

                {/* New uploads */}
                <div className="mt-2">
                  <label className="block text-white/90 text-sm mb-2">
                    Add Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="block w-full text-sm text-white/90 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#F3BA18] file:text-black hover:file:brightness-110 cursor-pointer"
                  />
                  {newImages.length > 0 && (
                    <>
                      <p className="text-xs text-white/60 mt-3">
                        {newImages.length} file(s) selected.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                        {previews.map((src, i) => (
                          <div
                            key={i}
                            className="relative aspect-square rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#111] group"
                          >
                            <img
                              src={src}
                              alt={`preview-${i}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveNewImage(i)}
                              className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full opacity-100 transition"
                              title="Remove"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Token & Net Worth */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaInfoCircle className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-semibold">Token & Worth</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    className="bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                    placeholder="Token Brand Name"
                    {...register("token_brand_name")}
                  />
                  <input
                    className="bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                    placeholder="Token Name"
                    {...register("token_name")}
                  />
                  <input
                    type="number"
                    className="bg-[#252525] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[#F3BA18]/60"
                    placeholder="Net Worth"
                    {...register("networth", {
                      validate: (v) =>
                        v === "" || !isNaN(Number(v)) || "Must be a number",
                    })}
                  />
                </div>
                {errors.networth && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.networth.message}
                  </p>
                )}
              </section>

              {/* Actions */}
              <section className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-2xl p-4 flex items-center justify-end gap-3">
                {/* <button
                  type="button"
                  onClick={() => {
                    reset();
                    newImages.forEach(
                      (_, i) => previews[i] && URL.revokeObjectURL(previews[i])
                    );
                    setNewImages([]);
                    setPreviews([]);
                    setValue("images", "", { shouldDirty: false });
                  }}
                  className="px-4 py-2 rounded-lg border border-[#333] text-white/85 hover:bg-[#232323]"
                  disabled={disabled || (!isDirty && !hasPendingUploads)}
                >
                  Reset
                </button> */}
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className=" gap-2 px-4 py-2 rounded-lg custom-button-two font-semibold hover:brightness-110 disabled:opacity-60"
                  disabled={disabled || (!isDirty && !hasPendingUploads)}
                >
                  <div className="flex gap-3 items-center">
                    <FaSave className="w-4 h-4" /> <span>Save Changes</span>
                  </div>
                </button>
              </section>
            </form>
          </div>

          {/* Right: Aside */}
          <div className="lg:w-[30%] flex lg:flex-col flex-row items-center lg:items-start text-white space-y-6 pt-6">
            <Link className="w-[100%] lg:block hidden" to="/">
              <img src={siteLogo} alt="Logo" />
            </Link>
            {user?.social_worth > 0 && (
              <div className="flex flex-col items-center gap-1 w-full">
                <img
                  src="/profileverified-fameexchange.png"
                  alt="Social Verified"
                  title="Social media accounts verified"
                  className="w-[100px]"
                />
                <span className="text-emerald-400 text-[11px] uppercase tracking-widest font-medium">
                  Social Verified
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="mt-5">
                <span className="custom-heading-seven ml-5">WELCOME TO</span>
                <span className="text-xl ml-5"> THE FAME EXCHANGE</span>
              </h1>
              <p className="text-white/80 text-xs ml-5">
                Secure, fast, and fair — your trusted partner in global currency
                exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MotionPageWrapper>
  );
}

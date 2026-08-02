import { useState } from "react";
import {
  useUploadKYCDocumentsMutation,
  useGetKYCDocumentsQuery,
  useGetSocialConnectionsQuery,
} from "../app/authApi";
import { useAuth } from "../utils/auth/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import KYCDetailsPageForTalent from "../pages/KYCDetailsPageForTalent";
import fameCoin from "../assets/home/thecoin.png";

const theme = {
  primary: "#a38b41",
  bg: "bg-[#171717]",
  card: "bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]",
  border: "border border-white/10",
  text: "text-white",
  sub: "text-gray-400",
};

const TOTAL_STEPS = 6;
const STEP_LABELS = [
  "Personal Info",
  "Government ID",
  "Selfie",
  "Social Confirmation",
  "Listing Fee",
  "Submit",
];

const isAdult = (dobString) => {
  if (!dobString) return false;
  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) return false;
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return dob <= eighteenYearsAgo;
};

const Dropzone = ({ id, label, hint, file, onChange, onRemove, accept = "image/*" }) => (
  <div>
    <label className={`block text-sm font-medium ${theme.text} mb-2`}>{label}</label>
    {file ? (
      <div className="relative inline-block">
        <img
          src={file.preview}
          alt={label}
          className="w-40 h-28 object-cover rounded-lg shadow-sm"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    ) : (
      <div className={`rounded-2xl p-6 text-center border-dashed ${theme.border}`}>
        <input id={id} type="file" accept={accept} onChange={onChange} className="hidden" />
        <label
          htmlFor={id}
          className={`cursor-pointer inline-flex items-center px-6 py-3 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10`}
        >
          Select File
        </label>
        {hint && <p className={`text-sm ${theme.sub} mt-2`}>{hint}</p>}
      </div>
    )}
  </div>
);

const KYCUpload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useGetKYCDocumentsQuery(user?.id);
  const { data: socialData } = useGetSocialConnectionsQuery();
  const [uploadKYCDocuments] = useUploadKYCDocumentsMutation();

  const kycStatus =
    data?.userDocument?.isKYCVerified || data?.user?.KYC_Verified;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [personal, setPersonal] = useState({
    fullLegalName: user?.name || "",
    dateOfBirth: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    taxId: "",
  });
  const [govIdType, setGovIdType] = useState("drivers_license");
  const [govIdFront, setGovIdFront] = useState(null);
  const [govIdBack, setGovIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [socialConfirmed, setSocialConfirmed] = useState(false);
  const [feeAcknowledged, setFeeAcknowledged] = useState(false);

  const connectedPlatforms = (socialData?.providers || []).filter((p) => p.connected);

  const withPreview = (file) =>
    file
      ? Object.assign(file, { preview: URL.createObjectURL(file) })
      : null;

  const goNext = () => {
    setErrorMsg("");
    if (step === 1) {
      if (!personal.fullLegalName.trim()) return setErrorMsg("Full legal name is required.");
      if (!isAdult(personal.dateOfBirth)) return setErrorMsg("You must be 18 or older to verify.");
      if (!personal.street.trim() || !personal.city.trim() || !personal.state.trim() || !personal.zipCode.trim()) {
        return setErrorMsg("Full residential address is required.");
      }
      if (!personal.taxId.trim()) return setErrorMsg("Tax ID / SSN is required.");
    }
    if (step === 2) {
      if (!govIdFront) return setErrorMsg("Please upload the front of your government ID.");
      if (govIdType !== "passport" && !govIdBack) {
        return setErrorMsg("Please upload the back of your ID (required for driver's license / state ID).");
      }
    }
    if (step === 3 && !selfie) return setErrorMsg("Please upload a selfie holding your ID.");
    if (step === 4 && connectedPlatforms.length > 0 && !socialConfirmed) {
      return setErrorMsg("Please confirm your connected account belongs to you.");
    }
    if (step === 5 && !feeAcknowledged) return setErrorMsg("Please acknowledge the listing fee to continue.");
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const goBack = () => {
    setErrorMsg("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append("docType", "government_id");
      submitData.append("govIdType", govIdType);
      submitData.append("dateOfBirth", personal.dateOfBirth);
      submitData.append("taxId", personal.taxId);
      submitData.append(
        "address",
        JSON.stringify({
          street: personal.street,
          city: personal.city,
          state: personal.state,
          zipCode: personal.zipCode,
          country: personal.country,
        })
      );
      submitData.append("text", `Full legal name: ${personal.fullLegalName}`);
      submitData.append("govIdFront", govIdFront);
      if (govIdBack) submitData.append("govIdBack", govIdBack);
      submitData.append("selfie", selfie);

      await uploadKYCDocuments(submitData).unwrap();
      toast.success("Your KYC application has been submitted!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Submission failed. Please try again.");
      setErrorMsg(err?.data?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`w-full py-10 container px-4 lg:px-8 ${theme.bg}`}>
      <h1 className={`text-3xl font-bold ${theme.text} mb-6`}>
        Identity Verification{data?.user?.name ? ` – ${data?.user?.name}` : ""}
      </h1>

      <KYCDetailsPageForTalent data={data} isLoading={isLoading} error={error} />

      {!kycStatus && (
        <div className="mt-12">
          <div className={`${theme.card} ${theme.border} rounded-2xl p-6`}>
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <p className={`text-xs uppercase tracking-widest mb-2`} style={{ color: theme.primary }}>
                    Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}
                  </p>
                  <h2 className={`text-2xl font-semibold ${theme.text}`}>
                    Before your shares go live, we need to verify your identity
                  </h2>
                  <p className={theme.sub}>
                    This protects you, your fans, and the platform.
                  </p>
                </div>

                {step === 1 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Full Legal Name</label>
                      <input
                        type="text"
                        value={personal.fullLegalName}
                        onChange={(e) => setPersonal((p) => ({ ...p, fullLegalName: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Date of Birth</label>
                      <input
                        type="date"
                        value={personal.dateOfBirth}
                        onChange={(e) => setPersonal((p) => ({ ...p, dateOfBirth: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Street address"
                        value={personal.street}
                        onChange={(e) => setPersonal((p) => ({ ...p, street: e.target.value }))}
                        className={`col-span-2 px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={personal.city}
                        onChange={(e) => setPersonal((p) => ({ ...p, city: e.target.value }))}
                        className={`px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={personal.state}
                        onChange={(e) => setPersonal((p) => ({ ...p, state: e.target.value }))}
                        className={`px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                      <input
                        type="text"
                        placeholder="ZIP code"
                        value={personal.zipCode}
                        onChange={(e) => setPersonal((p) => ({ ...p, zipCode: e.target.value }))}
                        className={`px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={personal.country}
                        onChange={(e) => setPersonal((p) => ({ ...p, country: e.target.value }))}
                        className={`px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Tax ID / SSN</label>
                      <input
                        type="password"
                        placeholder="•••-••-••••"
                        value={personal.taxId}
                        onChange={(e) => setPersonal((p) => ({ ...p, taxId: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 max-w-xl mx-auto">
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Government ID Type</label>
                      <select
                        value={govIdType}
                        onChange={(e) => setGovIdType(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 ${theme.text} ${theme.border} outline-none`}
                      >
                        <option value="drivers_license">Driver's License</option>
                        <option value="passport">Passport</option>
                        <option value="state_id">State ID</option>
                      </select>
                    </div>
                    <Dropzone
                      id="gov-id-front"
                      label="ID Front"
                      hint="Clear photo of the front of your ID"
                      file={govIdFront}
                      onChange={(e) => setGovIdFront(withPreview(e.target.files?.[0]))}
                      onRemove={() => setGovIdFront(null)}
                    />
                    {govIdType !== "passport" && (
                      <Dropzone
                        id="gov-id-back"
                        label="ID Back"
                        hint="Clear photo of the back of your ID"
                        file={govIdBack}
                        onChange={(e) => setGovIdBack(withPreview(e.target.files?.[0]))}
                        onRemove={() => setGovIdBack(null)}
                      />
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="max-w-xl mx-auto">
                    <Dropzone
                      id="selfie-upload"
                      label="Selfie Holding Your ID"
                      hint="Take a clear photo of yourself holding the ID you just uploaded"
                      file={selfie}
                      onChange={(e) => setSelfie(withPreview(e.target.files?.[0]))}
                      onRemove={() => setSelfie(null)}
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="max-w-xl mx-auto space-y-4">
                    {connectedPlatforms.length > 0 ? (
                      <>
                        <p className={`text-sm ${theme.sub}`}>Confirm these are your verified accounts:</p>
                        <div className="space-y-2">
                          {connectedPlatforms.map((p) => (
                            <div
                              key={p.platform}
                              className={`flex items-center justify-between p-3 rounded-lg ${theme.border}`}
                            >
                              <span className={`${theme.text} capitalize`}>{p.platform}</span>
                              <span className={theme.sub}>
                                {p.username ? `@${p.username}` : ""} {p.followers ? `· ${p.followers.toLocaleString()} followers` : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                        <label className={`flex items-center gap-2 text-sm ${theme.text}`}>
                          <input
                            type="checkbox"
                            checked={socialConfirmed}
                            onChange={(e) => setSocialConfirmed(e.target.checked)}
                          />
                          I confirm these are my verified accounts.
                        </label>
                      </>
                    ) : (
                      <p className={`text-sm ${theme.sub}`}>
                        No connected social accounts found yet. You can still continue —
                        connect your platforms anytime from your profile.
                      </p>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="max-w-xl mx-auto space-y-4">
                    <div className={`p-4 rounded-lg ${theme.border} bg-white/5`}>
                      <p className={`${theme.text} font-medium mb-1`}>Listing Fee</p>
                      <p className={`text-sm ${theme.sub}`}>
                        A one-time listing fee of 3% of your estimated valuation (minimum $500)
                        is charged automatically once your identity is verified and your shares
                        go live — not before, and not as part of this submission. No payment is
                        collected here.
                      </p>
                    </div>
                    <label className={`flex items-center gap-2 text-sm ${theme.text}`}>
                      <input
                        type="checkbox"
                        checked={feeAcknowledged}
                        onChange={(e) => setFeeAcknowledged(e.target.checked)}
                      />
                      I understand and acknowledge the listing fee.
                    </label>
                  </div>
                )}

                {step === 6 && (
                  <div className="max-w-xl mx-auto text-center space-y-3">
                    <p className={theme.text}>
                      Review complete. Submitting will send your documents for admin review.
                    </p>
                    <p className={`text-sm ${theme.sub}`}>
                      Estimated review time: 48-72 hours. You'll be notified by email once
                      your verification is complete.
                    </p>
                  </div>
                )}

                {errorMsg && (
                  <p className="text-red-400 text-sm text-center mt-4">{errorMsg}</p>
                )}

                <div className="flex justify-between gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => (step === 1 ? navigate("/") : goBack())}
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg ${theme.border} ${theme.text} hover:bg-white/10 cursor-pointer disabled:opacity-50`}
                  >
                    {step === 1 ? "Save for Later" : "Back"}
                  </button>
                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="px-6 py-2 rounded-lg text-white font-medium"
                      style={{ background: theme.primary, border: `1px solid ${theme.primary}` }}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50"
                      style={{ background: theme.primary, border: `1px solid ${theme.primary}` }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-6">
                <img src={fameCoin} alt="" className="w-14 h-14 mx-auto" />
                <h2 className={`text-2xl font-semibold ${theme.text}`}>
                  Your KYC application has been submitted!
                </h2>
                <p className={theme.sub}>
                  Submitted {new Date().toLocaleDateString()} — estimated review time: 48-72 hours.
                </p>
                <p className={`${theme.sub} text-sm`}>Current status: Pending Review</p>
                <p className={`text-sm ${theme.sub} max-w-md mx-auto`}>
                  Our team will review your documents. You'll receive an email when your
                  verification is complete. Once verified, your shares will automatically go
                  live on the trading board.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-2 rounded-lg text-white font-medium"
                  style={{ background: theme.primary, border: `1px solid ${theme.primary}` }}
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default KYCUpload;

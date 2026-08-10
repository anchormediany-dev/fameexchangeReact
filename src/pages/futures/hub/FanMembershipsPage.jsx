import { useState } from "react";
import { toast } from "react-toastify";
import { FiTrash2, FiLock, FiAward } from "react-icons/fi";
import {
  useGetMyMembershipQuery,
  useGetMyFanTiersQuery,
  useCreateFanTierMutation,
  useDeleteFanTierMutation,
  useStartMembershipCheckoutMutation,
} from "../../../app/futuresHubApi";
import SubscriptionCheckoutModal from "../SubscriptionCheckoutModal";

const ELITE_PRICE = 199;

function EliteGate() {
  const [startMembershipCheckout] = useStartMembershipCheckoutMutation();
  const [checkingOut, setCheckingOut] = useState(false);

  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <div className="w-14 h-14 rounded-2xl bg-[#191919] border border-[#2a2a2a] flex items-center justify-center mx-auto mb-5">
        <FiLock className="text-[#a38b41]" size={22} />
      </div>
      <h1 className="text-xl font-bold text-white mb-2">Elite Members Only</h1>
      <p className="text-gray-400 text-sm mb-6">
        The Fan Membership program is an exclusive Elite feature. Upgrade to create your own fan
        membership tiers and share exclusive content.
      </p>
      <button
        type="button"
        onClick={() => setCheckingOut(true)}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all"
      >
        <FiAward /> Upgrade to Elite
      </button>

      {checkingOut && (
        <SubscriptionCheckoutModal
          title="Elite Membership"
          priceLabel={`$${ELITE_PRICE}/mo`}
          startCheckout={() => startMembershipCheckout({ plan: "elite" }).unwrap()}
          onClose={() => setCheckingOut(false)}
          onSuccess={() => setCheckingOut(false)}
        />
      )}
    </div>
  );
}

function FanMembershipsContent() {
  const { data: tiersRes, isLoading } = useGetMyFanTiersQuery();
  const [createFanTier, { isLoading: creating }] = useCreateFanTierMutation();
  const [deleteFanTier] = useDeleteFanTierMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const tiers = tiersRes?.data || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim() || !(price > 0)) {
      toast.error("Give your tier a name and a price above $0.");
      return;
    }
    try {
      await createFanTier({ name: form.name.trim(), price, description: form.description.trim() }).unwrap();
      setForm({ name: "", price: "", description: "" });
      setShowForm(false);
      toast.success("Tier created.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create tier.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFanTier(id).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't delete tier.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white">Fan Memberships</h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          {showForm ? "Cancel" : "+ New Tier"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Let fans subscribe directly to you for perks you decide on.</p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Tier name (e.g. Inner Circle)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <input
            type="number"
            min="1"
            step="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="Price per month (USD)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What do fans get?"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create Tier"}
          </button>
        </form>
      )}

      {tiers.length === 0 ? (
        <p className="text-gray-500 text-sm">No tiers yet — create one to let fans support you directly.</p>
      ) : (
        <div className="space-y-3">
          {tiers.map((t) => (
            <div key={t._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  ${t.price}/mo{t.description ? ` · ${t.description}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(t._id)}
                className="text-gray-500 hover:text-red-400 transition p-1.5"
                title="Delete tier"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FanMembershipsPage() {
  const { data: membershipRes, isLoading } = useGetMyMembershipQuery();
  const isElite = membershipRes?.data?.status === "active" && membershipRes?.data?.plan === "elite";

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;
  if (!isElite) return <EliteGate />;
  return <FanMembershipsContent />;
}

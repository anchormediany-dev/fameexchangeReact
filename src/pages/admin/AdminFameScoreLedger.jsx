import React, { useMemo, useState } from "react";
import { useGetUsersQuery } from "../../app/authApi";
import {
  useLazyPreviewFameScoreQuery,
  useCreateTalentAdminMutation,
  useGetMarketTalentsQuery,
  useRecalculateTalentValuationMutation,
  useRecalculateAllValuationsMutation,
  useGetLedgerEntriesQuery,
  useLazyVerifyLedgerQuery,
  useGetFuturesTalentsQuery,
  useSimulatePledgeMutation,
  useGetPledgesForTalentQuery,
} from "../../app/tradingApi";

// Throwaway internal test/QA page for the FameScore valuation engine and the
// hash-chained ledger. Not part of the polished admin product — just enough
// UI to exercise both systems end-to-end in a browser instead of via curl.

const Section = ({ title, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 lg:p-6 space-y-4">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={`bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 ${props.className || ""}`}
  />
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 rounded-md bg-[#a38b41]/80 hover:bg-[#a38b41] text-black font-medium disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export default function AdminFameScoreLedger() {
  // ── User picker ─────────────────────────────────────────
  const { data: usersData } = useGetUsersQuery();
  const talentUsers = useMemo(
    () => (usersData?.users || []).filter((u) => u.role === "TALENT"),
    [usersData]
  );
  const [selectedUserId, setSelectedUserId] = useState("");
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [triggerPreview, { data: preview, isFetching: previewLoading, error: previewError }] =
    useLazyPreviewFameScoreQuery();

  // ── Create talent ───────────────────────────────────────
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [symbol, setSymbol] = useState("");
  const [createTalent, { isLoading: creating, error: createError, data: createResult }] =
    useCreateTalentAdminMutation();

  const handleCreate = async () => {
    if (!selectedUserId || !name || !slug || !symbol) return;
    await createTalent({
      userId: selectedUserId,
      name,
      slug,
      symbol,
      auto_price: true,
      min_price: Number(minPrice),
      max_price: Number(maxPrice),
    });
  };

  // ── Talent list + recalculation ─────────────────────────
  const { data: talentsData, refetch: refetchTalents } = useGetMarketTalentsQuery({ limit: 50 });
  const [recalcOne, { isLoading: recalcOneLoading }] = useRecalculateTalentValuationMutation();
  const [recalcAll, { isLoading: recalcAllLoading, data: recalcAllResult }] =
    useRecalculateAllValuationsMutation();
  const [lastRecalc, setLastRecalc] = useState(null);

  // ── Ledger ───────────────────────────────────────────────
  const { data: ledgerData, refetch: refetchLedger } = useGetLedgerEntriesQuery({ limit: 30 });
  const [triggerVerify, { data: verifyResult, isFetching: verifying }] = useLazyVerifyLedgerQuery();

  // ── Futures tier ─────────────────────────────────────────
  const fanUsers = useMemo(
    () => (usersData?.users || []).filter((u) => u.role === "FAN"),
    [usersData]
  );
  const { data: futuresData, refetch: refetchFutures } = useGetFuturesTalentsQuery();
  const [selectedFuturesTalentId, setSelectedFuturesTalentId] = useState("");
  const [selectedFanId, setSelectedFanId] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState(100);
  const [simulatePledge, { isLoading: pledging, error: pledgeError }] = useSimulatePledgeMutation();
  const { data: pledgesData, refetch: refetchPledges } = useGetPledgesForTalentQuery(
    selectedFuturesTalentId,
    { skip: !selectedFuturesTalentId }
  );

  return (
    <div className="space-y-6 text-gray-200">
      <h1 className="text-2xl font-bold text-white">FameScore + Ledger — Test Console</h1>

      <Section title="1. Preview FameScore for a talent user">
        <div className="flex flex-wrap gap-3 items-end">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white min-w-[260px]"
          >
            <option value="">Select a TALENT user…</option>
            {talentUsers.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">min_price</label>
            <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-28" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-400">max_price</label>
            <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-32" />
          </div>
          <Button
            disabled={!selectedUserId || previewLoading}
            onClick={() => triggerPreview({ userId: selectedUserId, min_price: minPrice, max_price: maxPrice })}
          >
            {previewLoading ? "Computing…" : "Preview FameScore"}
          </Button>
        </div>

        {previewError && (
          <p className="text-red-400 text-sm">{previewError?.data?.message || "Failed to preview"}</p>
        )}

        {preview && (
          <div className="bg-black/30 rounded-md p-4 space-y-2">
            <p>
              <span className="text-gray-400">FameScore:</span>{" "}
              <span className="text-xl font-bold text-[#d4c374]">{preview.fameScore}</span> / 1000
            </p>
            <p>
              <span className="text-gray-400">Suggested price:</span>{" "}
              <span className="font-semibold">${preview.suggestedPrice}</span>
            </p>
            <p className="text-xs text-gray-400">
              primary platform score: {preview.primary} · cross-platform bonus avg: {preview.secondaryAvg}
            </p>
            <pre className="text-xs text-gray-400 overflow-x-auto bg-black/40 p-2 rounded">
              {JSON.stringify(preview.breakdown, null, 2)}
            </pre>
          </div>
        )}
      </Section>

      <Section title="2. List a talent at its FameScore-derived price">
        <div className="flex flex-wrap gap-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Input placeholder="SYMBOL" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-28" />
          <Button disabled={!selectedUserId || !name || !slug || !symbol || creating} onClick={handleCreate}>
            {creating ? "Creating…" : "Create Talent (auto_price)"}
          </Button>
        </div>
        {createError && (
          <p className="text-red-400 text-sm">{createError?.data?.message || "Failed to create"}</p>
        )}
        {createResult?.success && (
          <p className="text-green-400 text-sm">
            Created "{createResult.talent.name}" at ${createResult.talent.current_price} (fame_score:{" "}
            {createResult.talent.fame_score})
          </p>
        )}
      </Section>

      <Section title="3. Existing talents — trigger re-mark">
        <div className="flex gap-3 mb-2">
          <Button onClick={() => refetchTalents()}>Refresh list</Button>
          <Button
            disabled={recalcAllLoading}
            onClick={async () => {
              const res = await recalcAll();
              setLastRecalc(res.data);
              refetchTalents();
              refetchLedger();
            }}
          >
            {recalcAllLoading ? "Running batch…" : "Recalculate ALL (run cron job now)"}
          </Button>
        </div>

        {recalcAllResult && (
          <p className="text-sm text-gray-300">
            Batch run: {recalcAllResult.succeeded}/{recalcAllResult.total} succeeded
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2">Name</th>
                <th>Symbol</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(talentsData?.talents || []).map((t) => (
                <tr key={t._id} className="border-b border-white/5">
                  <td className="py-2">{t.name}</td>
                  <td>{t.symbol}</td>
                  <td>${t.current_price}</td>
                  <td className="text-right">
                    <button
                      disabled={recalcOneLoading}
                      onClick={async () => {
                        const res = await recalcOne(t._id);
                        setLastRecalc(res.data);
                        refetchTalents();
                        refetchLedger();
                      }}
                      className="text-[#d4c374] underline text-xs"
                    >
                      Recalculate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {lastRecalc && (
          <pre className="text-xs text-gray-400 overflow-x-auto bg-black/40 p-2 rounded mt-2">
            {JSON.stringify(lastRecalc, null, 2)}
          </pre>
        )}
      </Section>

      <Section title="4. Hash-chained ledger">
        <div className="flex gap-3 mb-2">
          <Button onClick={() => refetchLedger()}>Refresh</Button>
          <Button disabled={verifying} onClick={() => triggerVerify({})}>
            {verifying ? "Verifying…" : "Verify entire chain"}
          </Button>
        </div>

        {verifyResult && (
          <p className={verifyResult.valid ? "text-green-400" : "text-red-400"}>
            {verifyResult.valid
              ? `VALID — ${verifyResult.checked} entries checked, no tampering detected.`
              : `TAMPERING DETECTED — ${verifyResult.breaks.length} break(s) found.`}
          </p>
        )}
        {verifyResult && !verifyResult.valid && (
          <pre className="text-xs text-red-300 overflow-x-auto bg-black/40 p-2 rounded">
            {JSON.stringify(verifyResult.breaks, null, 2)}
          </pre>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2">Seq</th>
                <th>Source</th>
                <th>Hash</th>
                <th>Prev hash</th>
                <th>Recorded</th>
              </tr>
            </thead>
            <tbody>
              {(ledgerData?.entries || []).map((e) => (
                <tr key={e._id} className="border-b border-white/5 font-mono">
                  <td className="py-2">{e.sequence}</td>
                  <td>{e.source_type}</td>
                  <td>{e.hash.slice(0, 10)}…</td>
                  <td>{e.prev_hash.slice(0, 10)}…</td>
                  <td>{new Date(e.recorded_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="5. Futures tier — pledges + graduation">
        <p className="text-xs text-gray-400">
          Talents below the FameScore tradeable threshold are listed here, non-tradeable, and open
          to fan pledges. Crossing the threshold (via "Recalculate" in section 3, or the nightly
          cron) auto-graduates them: every pending pledge converts to real shares with a bonus.
          "Simulate Pledge" bypasses Stripe — same as the wallet's test deposit endpoint — useful
          since no real Stripe test key is configured yet.
        </p>

        <div className="flex gap-3">
          <Button onClick={() => refetchFutures()}>Refresh futures list</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2">Name</th>
                <th>FameScore</th>
                <th>Projected price</th>
                <th>Total pledged</th>
                <th>Days left</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(futuresData?.talents || []).map((t) => (
                <tr
                  key={t._id}
                  className={`border-b border-white/5 cursor-pointer ${selectedFuturesTalentId === t._id ? "bg-white/5" : ""}`}
                  onClick={() => setSelectedFuturesTalentId(t._id)}
                >
                  <td className="py-2">{t.name}</td>
                  <td>{t.fame_score}</td>
                  <td>${t.projected_price}</td>
                  <td>${t.total_pledged}</td>
                  <td>{t.days_remaining ?? "—"}</td>
                  <td className="text-right">
                    <button
                      disabled={recalcOneLoading}
                      onClick={async (e) => {
                        e.stopPropagation();
                        const res = await recalcOne(t._id);
                        setLastRecalc(res.data);
                        refetchFutures();
                        refetchPledges();
                        refetchLedger();
                      }}
                      className="text-[#d4c374] underline text-xs"
                    >
                      Recalculate
                    </button>
                  </td>
                </tr>
              ))}
              {(futuresData?.talents || []).length === 0 && (
                <tr>
                  <td colSpan={6} className="py-3 text-gray-500 text-xs">
                    No open futures campaigns. Create one in section 2 using a low-FameScore user
                    (e.g. FuturesCreator, seeded with only 5,000 followers).
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedFuturesTalentId && (
          <div className="bg-black/30 rounded-md p-4 space-y-3">
            <p className="text-sm text-gray-300">
              Selected talent: <span className="text-white font-medium">{selectedFuturesTalentId}</span>
            </p>
            <div className="flex flex-wrap gap-3 items-end">
              <select
                value={selectedFanId}
                onChange={(e) => setSelectedFanId(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white min-w-[220px]"
              >
                <option value="">Select a FAN user…</option>
                {fanUsers.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
              <div className="flex flex-col">
                <label className="text-xs text-gray-400">Pledge amount ($)</label>
                <Input
                  type="number"
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  className="w-32"
                />
              </div>
              <Button
                disabled={!selectedFanId || pledging}
                onClick={async () => {
                  await simulatePledge({
                    talentId: selectedFuturesTalentId,
                    userId: selectedFanId,
                    amount: Number(pledgeAmount),
                  });
                  refetchFutures();
                  refetchPledges();
                  refetchLedger();
                }}
              >
                {pledging ? "Pledging…" : "Simulate Pledge (no Stripe)"}
              </Button>
            </div>
            {pledgeError && (
              <p className="text-red-400 text-sm">{pledgeError?.data?.message || "Failed to pledge"}</p>
            )}

            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2">Fan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Awarded units</th>
                </tr>
              </thead>
              <tbody>
                {(pledgesData?.pledges || []).map((p) => (
                  <tr key={p._id} className="border-b border-white/5">
                    <td className="py-2">{p.user_id?.name || p.user_id}</td>
                    <td>${p.amount}</td>
                    <td>{p.status}</td>
                    <td>{p.awarded_units ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

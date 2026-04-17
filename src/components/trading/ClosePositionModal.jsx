import { useState } from "react";
import { useClosePositionPreviewMutation, useClosePositionMutation } from "../../app/tradingApi";
import { toast } from "react-toastify";

const ClosePositionModal = ({ position, onClose, onSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [step, setStep] = useState("preview"); // preview | confirming | done

  const [fetchPreview, { isLoading: previewLoading }] = useClosePositionPreviewMutation();
  const [closePos, { isLoading: closing }] = useClosePositionMutation();

  const loadPreview = async () => {
    try {
      const res = await fetchPreview(position._id).unwrap();
      setPreview(res.preview);
      setStep("preview");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to load close preview");
    }
  };

  // Load preview on mount
  useState(() => {
    loadPreview();
  }, []);

  const handleConfirmClose = async () => {
    setStep("confirming");
    try {
      const res = await closePos(position._id).unwrap();
      setStep("done");
      toast.success("Position closed successfully!");
      onSuccess?.(res);
    } catch (err) {
      setStep("preview");
      toast.error(err?.data?.message || "Failed to close position");
    }
  };

  const pnlColor = (val) => {
    if (val > 0) return "text-green-400";
    if (val < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
        >
          ✕
        </button>

        {step === "done" ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-white mb-2">Position Closed!</h3>
            <p className="text-gray-400 text-sm">Your position has been closed successfully.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#c9a227] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-white mb-1">Close Position</h3>
            <p className="text-gray-500 text-sm mb-6">
              {position.talent_name} ({position.talent_symbol})
            </p>

            {previewLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-[#c9a227] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : preview ? (
              <div className="space-y-4">
                <div className="bg-[#0a0a0a] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Side</span>
                    <span className={`font-semibold uppercase ${position.side === "buy" ? "text-green-400" : "text-red-400"}`}>
                      {position.side}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Entry Price</span>
                    <span className="text-white font-mono">${Number(preview.entry_price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Exit Price</span>
                    <span className="text-white font-mono">${Number(preview.exit_price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Units</span>
                    <span className="text-white font-mono">{Number(preview.units).toFixed(6)}</span>
                  </div>
                  <div className="border-t border-[#1f1f1f] my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Invested Amount</span>
                    <span className="text-white font-mono">${Number(preview.invested_amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Profit / Loss</span>
                    <span className={`font-mono font-semibold ${pnlColor(preview.realized_pnl)}`}>
                      {preview.realized_pnl >= 0 ? "+" : ""}${Number(preview.realized_pnl).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Close Fee (0.5%)</span>
                    <span className="text-white font-mono">-${Number(preview.fees).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#1f1f1f] my-2" />
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-300">You Receive</span>
                    <span className="text-[#c9a227] font-mono">${Number(preview.net_settlement).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 border border-[#2a2a2a] text-gray-400 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmClose}
                    disabled={closing}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {closing ? "Closing..." : "Confirm Close"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Failed to load preview.{" "}
                <button onClick={loadPreview} className="text-[#c9a227] underline">
                  Retry
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClosePositionModal;

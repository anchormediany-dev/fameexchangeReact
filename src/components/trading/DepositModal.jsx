import { useState } from "react";
import { useDepositFundsMutation } from "../../app/tradingApi";
import { toast } from "react-toastify";

const DepositModal = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [deposit, { isLoading }] = useDepositFundsMutation();

  const handleDeposit = async () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      const res = await deposit(val).unwrap();
      toast.success(`$${val.toFixed(2)} deposited successfully!`);
      onSuccess?.(res);
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Deposit failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-white mb-1">Add Funds</h3>
        <p className="text-gray-500 text-sm mb-6">Deposit funds to your trading wallet</p>

        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
          Amount (USD)
        </label>
        <div className="relative mb-6">
          <span className="absolute left-3 top-2.5 text-gray-500 text-sm">$</span>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-7 pr-3 py-2.5 border border-[#2a2a2a] bg-[#0f0f0f] text-white rounded-lg focus:ring-2 focus:ring-[#c9a227] text-sm font-mono"
            placeholder="0.00"
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          {[100, 500, 1000, 5000].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(String(preset))}
              className="flex-1 text-xs py-2 border border-[#2a2a2a] rounded-lg text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              ${preset.toLocaleString()}
            </button>
          ))}
        </div>

        <button
          onClick={handleDeposit}
          disabled={isLoading || !amount}
          className="w-full mt-6 bg-[#c9a227] text-black py-3 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Deposit"}
        </button>
      </div>
    </div>
  );
};

export default DepositModal;

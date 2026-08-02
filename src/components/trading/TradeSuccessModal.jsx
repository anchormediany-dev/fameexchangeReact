import fameCoin from "../../assets/home/thecoin.png";

const TradeSuccessModal = ({ trade, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-6 text-center">
        <img src={fameCoin} alt="" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Trade Executed!</h3>
        <p className="text-gray-400 text-sm mb-6">Your order has been successfully placed.</p>

        <div className="bg-[#0a0a0a] rounded-xl p-4 space-y-3 text-left mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Reference</span>
            <span className="text-white font-mono text-xs">{trade?.reference_no || "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Side</span>
            <span className={`font-semibold uppercase ${trade?.side === "buy" ? "text-green-400" : "text-red-400"}`}>
              {trade?.side}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-mono">${Number(trade?.price || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Shares</span>
            <span className="text-white font-mono">{Number(trade?.units || 0).toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="text-white font-mono">${Number(trade?.amount || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fee</span>
            <span className="text-white font-mono">-${Number(trade?.fees || 0).toFixed(2)}</span>
          </div>
          <div className="border-t border-[#1f1f1f] my-2" />
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-gray-300">Balance After</span>
            <span className="text-[#c9a227] font-mono">${Number(trade?.wallet_balance_after || 0).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-[#c9a227] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#dbb934] transition-colors w-full"
        >
          Continue Trading
        </button>
      </div>
    </div>
  );
};

export default TradeSuccessModal;

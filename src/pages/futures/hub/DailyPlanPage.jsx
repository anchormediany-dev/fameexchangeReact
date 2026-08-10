import { toast } from "react-toastify";
import { FiCheck } from "react-icons/fi";
import {
  useGetMyDailyPlanQuery,
  useGenerateDailyPlanMutation,
  useCompleteDailyTaskMutation,
} from "../../../app/futuresHubApi";

export default function DailyPlanPage() {
  const today = new Date().toISOString().slice(0, 10);
  const { data: planRes, isLoading } = useGetMyDailyPlanQuery(today);
  const [generatePlan, { isLoading: generating }] = useGenerateDailyPlanMutation();
  const [completeTask] = useCompleteDailyTaskMutation();

  const plan = planRes?.data?.[0];

  const handleGenerate = async () => {
    try {
      await generatePlan().unwrap();
      toast.success("Today's plan is ready!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate plan.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white">Daily Plan</h1>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          {generating ? "Generating…" : plan ? "Regenerate" : "Generate Today's Plan"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Maya's daily accountability tasks, grounded in your profile.</p>

      {!plan ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">No plan yet for today</p>
          <p className="text-gray-500 text-sm">Let your AI Fame Team generate a personalized daily plan.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {plan.tasks.map((t) => (
            <div
              key={t._id}
              className={`flex items-start gap-3 bg-[#191919] border rounded-xl p-4 ${
                t.completed ? "border-emerald-700/40" : "border-[#2a2a2a]"
              }`}
            >
              <button
                type="button"
                onClick={() => !t.completed && completeTask({ planId: plan._id, taskId: t._id })}
                disabled={t.completed}
                className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                  t.completed ? "bg-emerald-500 border-emerald-500" : "border-[#555] hover:border-[#a38b41]"
                }`}
              >
                {t.completed && <FiCheck size={12} className="text-black" />}
              </button>
              <div>
                <p className={`text-sm font-semibold ${t.completed ? "text-gray-500 line-through" : "text-white"}`}>
                  {t.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

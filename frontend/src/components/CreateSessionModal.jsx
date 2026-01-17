import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="relative w-full max-w-2xl mx-4
        rounded-3xl bg-[#0b0f14] text-white
        border border-white/10
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/10">
          <h3 className="text-2xl font-extrabold tracking-tight">
            Create New Session
          </h3>
          <p className="text-white/60 mt-1">
            Choose a problem to start a 1-on-1 coding session
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Select Problem <span className="text-red-400">*</span>
            </label>

            <select
              className="select w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-400"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value
                );
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled className="bg-[#0b0f14]">
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option
                  key={problem.id}
                  value={problem.title}
                  className="bg-[#0b0f14]"
                >
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Code2Icon className="size-6 text-orange-400 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Room Summary</p>
                <p className="text-white/80">
                  Problem:{" "}
                  <span className="font-medium text-white">
                    {roomConfig.problem}
                  </span>
                </p>
                <p className="text-white/60">
                  Max Participants:{" "}
                  <span className="text-white">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button
            className="px-5 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            className={`px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              isCreating || !roomConfig.problem
                ? "bg-orange-500/20 text-orange-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-amber-400 text-black hover:shadow-[0_8px_30px_rgba(255,140,0,0.45)] hover:scale-[1.03]"
            }`}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;

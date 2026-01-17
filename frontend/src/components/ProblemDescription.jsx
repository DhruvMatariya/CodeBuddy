import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#0b0f14] text-white">

      {/* HEADER */}
      <div className="p-6 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {problem.title}
          </h1>
          <span
            className={`badge badge-sm ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        <p className="text-white/60 mb-4">
          {problem.category}
        </p>

        {/* PROBLEM SELECTOR */}
        <select
          className="select select-sm w-full bg-white/5 border border-white/10
            text-white focus:outline-none focus:border-orange-400"
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id} className="bg-[#0b0f14]">
              {p.title} — {p.difficulty}
            </option>
          ))}
        </select>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-8">

        {/* DESCRIPTION */}
        <div
          className="rounded-3xl bg-white/5 border border-white/10
          shadow-[0_18px_45px_rgba(0,0,0,0.4)] p-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Description
          </h2>

          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx}>{note}</p>
            ))}
          </div>
        </div>

        {/* EXAMPLES */}
        <div
          className="rounded-3xl bg-white/5 border border-white/10
          shadow-[0_18px_45px_rgba(0,0,0,0.4)] p-6"
        >
          <h2 className="text-xl font-semibold mb-6">
            Examples
          </h2>

          <div className="space-y-6">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="badge badge-sm bg-orange-500/15
                    text-orange-400 border border-orange-500/30"
                  >
                    {idx + 1}
                  </span>
                  <span className="font-medium">
                    Example {idx + 1}
                  </span>
                </div>

                <div
                  className="rounded-2xl bg-black/40 border border-white/10
                  p-4 font-mono text-sm space-y-2"
                >
                  <div className="flex gap-2">
                    <span className="text-orange-400 font-semibold min-w-[70px]">
                      Input:
                    </span>
                    <span className="text-white/90">
                      {example.input}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-amber-400 font-semibold min-w-[70px]">
                      Output:
                    </span>
                    <span className="text-white/90">
                      {example.output}
                    </span>
                  </div>

                  {example.explanation && (
                    <div className="pt-3 mt-3 border-t border-white/10">
                      <span className="text-xs text-white/60 font-sans">
                        <span className="font-semibold">Explanation:</span>{" "}
                        {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div
          className="rounded-3xl bg-white/5 border border-white/10
          shadow-[0_18px_45px_rgba(0,0,0,0.4)] p-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Constraints
          </h2>

          <ul className="space-y-3 text-white/80">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-orange-400">•</span>
                <code
                  className="text-sm bg-black/30 px-2 py-1 rounded-lg
                  border border-white/10"
                >
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ProblemDescription;

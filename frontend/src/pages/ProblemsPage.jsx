import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
            Practice <span className="text-orange-400">Problems</span>
          </h1>
          <p className="text-white/60 max-w-xl">
            Sharpen your problem-solving skills with carefully curated challenges
            designed for interviews and real-world coding.
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-5">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block rounded-3xl bg-white/5 border border-white/10
              shadow-[0_18px_45px_rgba(0,0,0,0.4)]
              hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(0,0,0,0.6)]
              transition-all duration-300"
            >
              <div className="p-6 flex items-center justify-between gap-6">

                {/* LEFT */}
                <div className="flex-1">

                  <div className="flex items-start gap-4 mb-3">
                    <div className="size-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
                      <Code2Icon className="size-6 text-orange-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold">
                          {problem.title}
                        </h2>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">
                        {problem.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/70 leading-relaxed">
                    {problem.description.text}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 text-orange-400 font-medium shrink-0">
                  <span>Solve</span>
                  <ChevronRightIcon className="size-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-16 rounded-3xl bg-white/5 border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <div>
                <div className="text-sm text-white/50">Total Problems</div>
                <div className="text-3xl font-extrabold text-orange-400">
                  {problems.length}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/50">Easy</div>
                <div className="text-3xl font-extrabold text-green-400">
                  {easyProblemsCount}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/50">Medium</div>
                <div className="text-3xl font-extrabold text-yellow-400">
                  {mediumProblemsCount}
                </div>
              </div>

              <div>
                <div className="text-sm text-white/50">Hard</div>
                <div className="text-3xl font-extrabold text-red-400">
                  {hardProblemsCount}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProblemsPage;

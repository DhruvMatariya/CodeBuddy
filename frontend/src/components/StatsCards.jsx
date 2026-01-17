import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">

      {/* ACTIVE SESSIONS */}
      <div
        className="rounded-3xl bg-[#0b0f14] text-white
        border border-white/10
        shadow-[0_18px_45px_rgba(0,0,0,0.5)]
        hover:border-orange-500/40 transition"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-3 rounded-2xl
              bg-orange-500/15 border border-orange-500/30"
            >
              <UsersIcon className="w-7 h-7 text-orange-400" />
            </div>

            <span
              className="px-3 py-1 text-xs font-semibold rounded-full
              bg-orange-500/15 text-orange-400 border border-orange-500/30"
            >
              Live
            </span>
          </div>

          <div className="text-4xl font-extrabold mb-1">
            {activeSessionsCount}
          </div>

          <div className="text-sm text-white/60">
            Active Sessions
          </div>
        </div>
      </div>

      {/* TOTAL SESSIONS */}
      <div
        className="rounded-3xl bg-[#0b0f14] text-white
        border border-white/10
        shadow-[0_18px_45px_rgba(0,0,0,0.5)]
        hover:border-amber-400/40 transition"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-3 rounded-2xl
              bg-amber-400/15 border border-amber-400/30"
            >
              <TrophyIcon className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          <div className="text-4xl font-extrabold mb-1">
            {recentSessionsCount}
          </div>

          <div className="text-sm text-white/60">
            Total Sessions
          </div>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;

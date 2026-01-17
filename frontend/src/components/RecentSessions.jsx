import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div
      className="mt-8 rounded-3xl bg-[#0b0f14] text-white
      border border-white/10
      shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
    >
      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-2 rounded-xl
            bg-amber-400/15 border border-amber-400/30"
          >
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Your Past Sessions
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* LOADING */}
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-orange-400" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const isActive = session.status === "active";

              return (
                <div
                  key={session._id}
                  className={`relative rounded-2xl p-5
                  bg-white/5 border border-white/10
                  hover:border-orange-500/40 transition`}
                >
                  {/* ACTIVE BADGE */}
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="flex items-center gap-1 text-xs font-semibold
                        bg-green-400/15 text-green-400
                        border border-green-400/30
                        px-2 py-1 rounded-full"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>
                  )}

                  {/* CARD HEADER */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${
                        isActive
                          ? "bg-green-400/20 border border-green-400/40"
                          : "bg-orange-500/20 border border-orange-500/40"
                      }`}
                    >
                      <Code2
                        className={`w-6 h-6 ${
                          isActive ? "text-green-400" : "text-orange-400"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate mb-1">
                        {session.problem}
                      </h3>
                      <span
                        className={`badge badge-sm ${getDifficultyBadgeClass(
                          session.difficulty
                        )}`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* META */}
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(
                          new Date(session.createdAt),
                          { addSuffix: true }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs font-semibold text-white/60 uppercase">
                      Completed
                    </span>
                    <span className="text-xs text-white/40">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            /* EMPTY STATE */
            <div className="col-span-full text-center py-20">
              <div
                className="w-20 h-20 mx-auto mb-4
                bg-white/5 border border-white/10
                rounded-3xl flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-orange-400/60" />
              </div>
              <p className="text-lg font-semibold text-white/70 mb-1">
                No sessions yet
              </p>
              <p className="text-sm text-white/50">
                Start your coding journey today!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;

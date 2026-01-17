import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  Panda,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div
      className="lg:col-span-2 h-full
      rounded-3xl bg-[#0b0f14] text-white
      border border-white/10
      shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
    >
      <div className="p-6 h-full flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl
              bg-orange-500/15 border border-orange-500/30"
            >
              <ZapIcon className="size-5 text-orange-400" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Live Sessions
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-green-400" />
            <span className="text-green-400 font-medium">
              {sessions.length} active
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-3 max-h-[420px] overflow-y-auto pr-2">

          {/* LOADING */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-orange-400" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const isFull = session.participant && !isUserInSession(session);

              return (
                <div
                  key={session._id}
                  className="rounded-2xl bg-white/5 border border-white/10
                  hover:border-orange-500/40 transition"
                >
                  <div className="flex items-center justify-between gap-4 p-5">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className="relative size-14 rounded-xl
                        bg-gradient-to-br from-orange-500 to-amber-400
                        flex items-center justify-center"
                      >
                        <Code2Icon className="size-7 text-black" />
                        <span
                          className="absolute -top-1 -right-1 size-3
                          rounded-full bg-green-400 border-2 border-[#0b0f14]"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg truncate">
                            {session.problem}
                          </h3>
                          <span
                            className={`badge badge-sm ${getDifficultyBadgeClass(
                              session.difficulty
                            )}`}
                          >
                            {session.difficulty[0].toUpperCase() +
                              session.difficulty.slice(1)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                          <div className="flex items-center gap-1.5">
                            <CrownIcon className="size-4" />
                            <span className="font-medium">
                              {session.host?.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <UsersIcon className="size-4" />
                            <span className="text-xs">
                              {session.participant ? "2/2" : "1/2"}
                            </span>
                          </div>

                          {isFull ? (
                            <span className="badge badge-error badge-sm">
                              FULL
                            </span>
                          ) : (
                            <span className="badge badge-success badge-sm">
                              OPEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ACTION */}
                    {isFull ? (
                      <button className="px-4 py-2 rounded-xl text-sm bg-white/5 text-white/40 cursor-not-allowed">
                        Full
                      </button>
                    ) : (
                      <Link
                        to={`/session/${session._id}`}
                        className="px-5 py-2 rounded-xl text-sm font-semibold
                        bg-gradient-to-r from-orange-500 to-amber-400 text-black
                        hover:shadow-[0_8px_30px_rgba(255,140,0,0.45)]
                        hover:scale-[1.03] transition-all flex items-center gap-2"
                      >
                        {isUserInSession(session) ? "Rejoin" : "Join"}
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* EMPTY STATE */
            <div className="text-center py-20">
              <div
                className="w-20 h-20 mx-auto mb-4
                bg-white/5 border border-white/10
                rounded-3xl flex items-center justify-center"
              >
                <Panda className="w-10 h-10 text-orange-400/60" />
              </div>
              <p className="text-lg font-semibold text-white/70 mb-1">
                No active sessions
              </p>
              <p className="text-sm text-white/50">
                Be the first to create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;

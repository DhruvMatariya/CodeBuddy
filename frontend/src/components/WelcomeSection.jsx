import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, Panda, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden bg-[#0b0f14] text-white">

      {/* SUBTLE AMBIENT GLOW */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] bg-amber-400/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-2xl
                bg-gradient-to-br from-orange-500 to-amber-400
                shadow-[0_0_18px_rgba(255,140,0,0.35)]
                flex items-center justify-center"
              >
                <Panda className="w-6 h-6 text-black" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Welcome back,
                <span className="ml-2 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  {user?.firstName || "there"}!
                </span>
              </h1>
            </div>

            <p className="text-lg text-white/60 ml-16 max-w-xl">
              Ready to sharpen your problem-solving skills and push your limits today?
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onCreateSession}
            className="group px-8 py-4 rounded-2xl font-semibold
              bg-gradient-to-r from-orange-500 to-amber-400 text-black
              shadow-[0_8px_30px_rgba(255,140,0,0.45)]
              hover:shadow-[0_14px_45px_rgba(255,140,0,0.65)]
              hover:scale-[1.03] transition-all"
          >
            <div className="flex items-center gap-3 text-lg">
              <ZapIcon className="w-6 h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;

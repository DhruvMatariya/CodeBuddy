import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  Panda,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0b0f14] text-white overflow-hidden">

      {/* SOFT AMBIENT BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-amber-400/10 blur-[120px] rounded-full" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="size-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
              shadow-[0_0_18px_rgba(255,140,0,0.35)]
              group-hover:shadow-[0_0_28px_rgba(255,140,0,0.55)]
              transition-all flex items-center justify-center"
            >
              <Panda className="size-6 text-black" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider">
                Talent IQ
              </span>
              <span className="text-xs text-white/60 tracking-wide -mt-1">
                Code Together
              </span>
            </div>
          </Link>

          {/* AUTH */}
          <SignInButton mode="modal">
            <button
              className="px-6 py-3 rounded-xl font-semibold text-black
              bg-gradient-to-r from-orange-500 to-amber-400
              shadow-[0_8px_30px_rgba(255,140,0,0.45)]
              hover:shadow-[0_12px_45px_rgba(255,140,0,0.65)]
              hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRightIcon className="size-4" />
            </button>
          </SignInButton>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-10">

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-orange-500/10 border border-orange-500/30
            text-orange-400 text-sm font-medium"
          >
            <ZapIcon className="size-4" />
            Real-time Collaboration
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Code Together,
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 blur-md opacity-40" />
            </span>
            <br />
            <span className="text-white">Learn Together</span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            A high-performance platform for collaborative coding interviews and
            pair programming. Built for focus, speed, and confidence.
          </p>

          {/* FEATURE TAGS */}
          <div className="flex flex-wrap gap-3">
            {["Live Video", "Code Editor", "Multi-Language"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-white/5 border border-white/10 text-white/80"
              >
                <CheckIcon className="size-4 text-orange-400" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <SignInButton mode="modal">
              <button
                className="px-8 py-4 rounded-2xl font-semibold text-black
                bg-gradient-to-r from-orange-500 to-amber-400
                shadow-[0_8px_35px_rgba(255,140,0,0.5)]
                hover:shadow-[0_14px_50px_rgba(255,140,0,0.7)]
                hover:scale-[1.03] transition-all flex items-center gap-2"
              >
                Start Coding
                <ArrowRightIcon className="size-5" />
              </button>
            </SignInButton>

            <button
              className="px-8 py-4 rounded-2xl border border-white/20
              hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <VideoIcon className="size-5 text-orange-400" />
              Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              ["10K+", "Users"],
              ["50K+", "Sessions"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-3xl font-extrabold text-orange-400">
                  {value}
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative">
          <img
            src="/hero2.png"
            alt="Platform Preview"
            className="rounded-3xl border border-white/10
              shadow-[0_25px_60px_rgba(0,0,0,0.55)]
              hover:scale-[1.03] transition-all duration-700"
          />
          <div className="absolute inset-0 rounded-3xl bg-white/5 pointer-events-none" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">
            Built for <span className="text-orange-400">Performance</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Every feature is designed to eliminate friction and maximize focus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: VideoIcon, title: "HD Video", desc: "Zero-lag communication" },
            { icon: Code2Icon, title: "Live Editor", desc: "Real-time collaboration" },
            { icon: UsersIcon, title: "Team Sync", desc: "Seamless pairing" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-8 rounded-3xl bg-white/5 border border-white/10
              shadow-[0_20px_50px_rgba(0,0,0,0.45)]
              hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]
              transition-all"
            >
              <div className="size-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-6">
                <Icon className="size-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;

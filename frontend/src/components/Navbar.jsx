import { Link, useLocation } from "react-router";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  Panda,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.03]"
        >
          <div
            className="size-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
            shadow-[0_0_18px_rgba(255,140,0,0.35)]
            group-hover:shadow-[0_0_28px_rgba(255,140,0,0.55)]
            transition-all flex items-center justify-center"
          >
            <Panda className="size-6 text-black" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-xl tracking-wider text-white">
              CodeBuddy
            </span>
            <span className="text-xs text-white/60 tracking-wide -mt-1">
              Code Together
            </span>
          </div>
        </Link>

        {/* NAV LINKS + USER */}
        <div className="flex items-center gap-1">

          {/* PROBLEMS */}
          <Link
            to="/problems"
            className={`px-4 py-2.5 rounded-xl transition-all duration-200
              ${
                isActive("/problems")
                  ? "bg-orange-500/15 text-orange-400 shadow-[inset_0_0_0_1px_rgba(255,140,0,0.4)]"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline">
                Problems
              </span>
            </div>
          </Link>

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-xl transition-all duration-200
              ${
                isActive("/dashboard")
                  ? "bg-orange-500/15 text-orange-400 shadow-[inset_0_0_0_1px_rgba(255,140,0,0.4)]"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline">
                Dashboard
              </span>
            </div>
          </Link>

          {/* USER */}
          <div className="ml-4 mt-1">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "ring-2 ring-orange-500/40 hover:ring-orange-500 transition",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

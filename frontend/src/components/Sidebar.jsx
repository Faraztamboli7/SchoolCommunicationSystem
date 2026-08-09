import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Communications",
    path: "/communications",
    icon: MessageSquare,
    end: true,
  },
  {
    name: "Create Notice",
    path: "/communications/create",
    icon: PlusCircle,
    end: true,
  },
  {
    name: "Tracking",
    path: "/tracking",
    icon: BarChart3,
    end: true,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
    end: true,
  },
];

export default function Sidebar() {
    const navigate = useNavigate();

const { logout } = useAuth();

const handleLogout = () => {
  logout();

  toast.success("Logged out successfully");

  navigate("/login", {
    replace: true,
  });
};
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <GraduationCap size={23} />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              EduConnect
            </h1>

            <p className="text-xs text-slate-400">
              School Management
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
          Main Menu
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
  key={item.path}
  to={item.path}
  end={item.end}
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`
  }
>
              <Icon size={19} />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800">

        <button
  onClick={handleLogout}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
>
  <LogOut size={19} />

  <span className="text-sm font-medium">
    Logout
  </span>
</button>
      </div>

    </aside>
  );
}
import { useState } from "react";
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  PieChart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Team" },
    { icon: Folder, label: "Products" },
    { icon: Calendar, label: "Purchase Orders" },
    { icon: FileText, label: "Create Purchase Order" },
    { icon: PieChart, label: "Create Supplier" },
  ];

  const teams = [
    { initial: "M", name: "Manager" },
    { initial: "S", name: "Staff" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          flex flex-col transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo + Close (mobile) */}
        <div className="flex items-center justify-between px-5 pt-6 pb-8">
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
            <path
              d="M2 22 C6 14, 10 6, 18 6 C26 6, 28 14, 34 10"
              stroke="#4F46E5"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M2 16 C6 8, 12 2, 20 4 C28 6, 30 16, 34 14"
              stroke="#4F46E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.label;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setActiveMenu(item.label)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium"
                      }
                    `}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Teams Section */}
          <div className="mt-8">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Your teams
            </p>
            <ul className="space-y-0.5">
              {teams.map((team) => (
                <li key={team.name}>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium transition-colors duration-150">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
                      {team.initial}
                    </div>
                    <span>{team.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Settings pinned bottom */}
        <div className="px-3 pb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium transition-colors duration-150">
            <Settings size={18} strokeWidth={1.8} />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

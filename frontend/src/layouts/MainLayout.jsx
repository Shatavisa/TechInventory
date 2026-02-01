import { Outlet } from "react-router-dom";
import Navbar from "../components/Sidebar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Navbar on Left */}
      <Navbar />

      {/* Right Side - Header and Outlet */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="w-full h-14 border-b border-gray-200 bg-white flex items-center justify-end px-6 flex-shrink-0">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src="https://ui-avatars.com/api/?name=Debdut+Karpask&background=c0c0c0&color=555&size=32"
                alt="Tom Cook"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-gray-800">
                Debdut Karpas
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Your profile
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

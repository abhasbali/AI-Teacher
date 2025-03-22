import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { name: "Students", icon: <Users />, path: "/students" },
  { name: "Content", icon: <BookOpen />, path: "/content" },
  { name: "Grading", icon: <GraduationCap />, path: "/grading" },
  { name: "Messages", icon: <MessageSquare />, path: "/messages" },
  { name: "Settings", icon: <Settings />, path: "/settings" },
];

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-full w-64 flex flex-col bg-gray-900 text-white shadow-lg border-r border-gray-800">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <div className="flex items-center gap-2">
          {/* AI Brain Icon */}
          <div className="relative w-10 h-10">
            {/* Outer Circle */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{
                animation: "spin 8s linear infinite"
              }}
            />
            
            {/* Inner Circle */}
            <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
              {/* Neural Network Lines */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-[1px] bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                    animation: `pulse 2s infinite ${i * 0.3}s`
                  }}
                />
              ))}
              
              {/* Pulsing Center Point */}
              <div
                className="w-2 h-2 rounded-full bg-cyan-500"
                style={{
                  animation: "pulse 2s infinite"
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              EduAssist
            </span>
            <span className="text-sm text-slate-400 -mt-1">
              AI Teaching Assistant
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span
                  className={`w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110 ${
                    window.location.pathname === item.path
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-300 group">
          <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white transition-transform duration-300 group-hover:scale-110" />
          Logout
        </button>
      </div>
    </div>
  );
}

<style jsx global>{`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0.5; transform: scale(1); }
  }
`}</style>

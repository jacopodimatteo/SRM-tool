import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  LayoutDashboard,
  Building2,
  PieChart,
  Bell,
  FileBarChart2,
  Settings,
  Search,
  ChevronDown,
  LogOut,
  User,
  X,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Menu,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Building2, label: "Suppliers", path: "/" },
  {
    icon: PieChart,
    label: "Portfolio View",
    path: "/portfolio",
  },
  { icon: Bell, label: "Alerts", path: "/" },
  { icon: FileBarChart2, label: "Reports", path: "/" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const mockNotifications = [
  {
    id: 1,
    type: "alert",
    text: "TechCorp credit score declined by 8 points",
    time: "2h ago",
  },
  {
    id: 2,
    type: "risk",
    text: "Baltic Steel ESG risk escalated to HIGH",
    time: "4h ago",
  },
  {
    id: 3,
    type: "approval",
    text: "Escalation approval required: Nexus Software",
    time: "1d ago",
  },
  {
    id: 4,
    type: "alert",
    text: "ISO 9001 expiring in 18 days – TechCorp",
    time: "1d ago",
  },
];

export function Layout() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-56" : "w-16"} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 shrink-0 z-20`}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              SR
            </span>
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-gray-800 truncate">
              Proactive SRM
            </span>
          )}
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active =
              (location.pathname === path &&
                label !== "Alerts" &&
                label !== "Reports" &&
                label !== "Suppliers" &&
                label !== "Dashboard") ||
              (location.pathname === "/" &&
                (label === "Dashboard" ||
                  label === "Suppliers")) ||
              (location.pathname === "/portfolio" &&
                label === "Portfolio View") ||
              (location.pathname === "/settings" &&
                label === "Settings");
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm">{label}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-gray-100">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          >
            <Menu size={18} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search supplier by name..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="font-semibold text-gray-800 text-sm">
                      Notifications
                    </span>
                    <button onClick={() => setNotifOpen(false)}>
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="py-1">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                      >
                        <div className="flex gap-2.5">
                          {n.type === "alert" && (
                            <AlertTriangle
                              size={15}
                              className="text-yellow-500 mt-0.5 shrink-0"
                            />
                          )}
                          {n.type === "risk" && (
                            <TrendingUp
                              size={15}
                              className="text-red-500 mt-0.5 shrink-0"
                            />
                          )}
                          {n.type === "approval" && (
                            <CheckCircle
                              size={15}
                              className="text-blue-500 mt-0.5 shrink-0"
                            />
                          )}
                          <div>
                            <p className="text-sm text-gray-700">
                              {n.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    EB
                  </span>
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  Elisa B.
                </span>
                <ChevronDown
                  size={14}
                  className="text-gray-400"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings size={15} /> Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
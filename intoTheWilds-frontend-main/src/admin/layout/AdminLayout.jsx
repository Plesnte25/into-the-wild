import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Assuming Sidebar is correctly implemented
import Topbar from "./Topbar"; // Assuming Topbar is correctly implemented

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Container */}
      {/* For desktop, use a fixed width or transition width. For mobile, keep the overlay approach. */}
      <div
        className={`
          flex-shrink-0
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"} {/* Adjust these widths as per your Sidebar */}
          hidden lg:block 
          bg-slate-900 border-r border-slate-800
        `}
      >
        <Sidebar
          collapsed={collapsed}
          toggle={toggleSidebar}
          onExit={() => navigate("/user-profile")}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform 
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:hidden 
                    transition-transform duration-300 ease-in-out
                    w-64 bg-slate-900 border-r border-slate-800`}
      >
        <Sidebar
          collapsed={false} // Mobile sidebar is always "open" (not collapsed) when visible
          toggle={() => setMobileOpen(!mobileOpen)} // Close on toggle within mobile sidebar
          onExit={() => {
            navigate("/user-");
            setMobileOpen(false); // Close sidebar after navigation
          }}
        />
      </div>

      {/* Dark overlay on mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)} // Click to close overlay
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden"> {/* Added overflow-hidden to main content */}
        <Topbar onToggle={() => setMobileOpen(!mobileOpen)} />

        {/* The main content area that scrolls */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
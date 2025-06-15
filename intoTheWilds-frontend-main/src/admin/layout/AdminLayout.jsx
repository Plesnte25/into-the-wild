import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* sidebar – always rendered, but translated on mobile */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform 
                    ${
                      mobileOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0
                    transition-transform`}
      >
        <Sidebar
          collapsed={collapsed}
          toggle={toggle}
          onExit={() => navigate("/login")}
        />
      </div>

      {/* dark overlay on mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        />
      )}

      {/* main column */}
      <div className="flex flex-col flex-1">
        <Topbar onToggle={() => setMobileOpen(!mobileOpen)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

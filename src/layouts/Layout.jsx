import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-surface dark:bg-surface-dark">
      <div className="sidebar-print-hide">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="navbar-print-hide">
          <Navbar />
        </div>
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

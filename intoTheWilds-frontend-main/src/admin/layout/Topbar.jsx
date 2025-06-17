import { Menu } from "lucide-react";

export default function Topbar({ onToggle }) {
  return (
    <header className="h-14 bg-[#101729] flex items-center px-4 shadow">
      <button onClick={onToggle} className="lg:hidden p-2 rounded hover:bg-slate-800">
        <Menu size={22}/>
      </button>
      <h1 className="ml-3 text-lg font-semibold tracking-wider">Into-The-Wild Admin</h1>
    </header>
  );
}

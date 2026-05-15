import { NavLink } from "react-router-dom";
import { BookMarked, Search, Info, Library, PlusCircle } from "lucide-react";

export default function Navbar({ onSearchChange }) {
  const navItems = [
    { path: "/", label: "Discovery", icon: Search },
    { path: "/library", label: "My Library", icon: Library },
    { path: "/add", label: "Add Book", icon: PlusCircle },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-brand-stone/10 p-6 flex flex-col shadow-sm">
      <NavLink to="/" className="flex items-center gap-2 text-brand-stone hover:text-brand-amber transition-colors mb-10 px-2">
        <BookMarked size={32} className="text-brand-amber" />
        <span className="font-serif font-bold text-2xl tracking-tight italic">Book Vault</span>
      </NavLink>

      <div className="relative mb-8 px-2">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-stone/40" size={18} />
        <input
          type="text"
          placeholder="Search library..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-brand-stone/5 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-amber/20 transition-all outline-none"
        />
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive ? "text-brand-amber bg-brand-amber/10" : "text-brand-stone hover:bg-brand-stone/5"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 py-6 bg-brand-cream rounded-2xl text-center border border-brand-stone/5">
        <p className="text-[10px] text-brand-stone/50 font-medium leading-relaxed italic">
          "A reader lives a thousand lives before he dies... The man who never reads lives only one."
        </p>
        <p className="text-[10px] text-brand-stone/50 font-medium mt-2">- George R. R. Martin</p>
      </div>
    </aside>
  );
}

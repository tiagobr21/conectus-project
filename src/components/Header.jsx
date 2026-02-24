import { LogOut } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const user = {
    name: "Milena Santana Borges",
    email: "milena.santana@energy.org.br",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="w-full h-[70px] bg-white flex items-center justify-end px-6 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#0D1931] text-white flex items-center justify-center font-semibold border-2 border-cyan-400 cursor-pointer">
          {initials}
        </div>

        <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-[260px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fadeIn">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0D1931] text-white flex items-center justify-center font-semibold">
                {initials}
              </div>

              <div>
                <p className="font-semibold text-[#0D1931] text-sm">
                  {user.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="border-t pt-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition text-sm">
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
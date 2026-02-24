import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const [openMenu, setOpenMenu] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="relative">
      {/* BOTÃO COLAPSAR */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-6 z-50 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
      >
        {collapsed ? (
          <ArrowLeft size={16} className="rotate-180" />
        ) : (
          <ArrowLeft size={16} />
        )}
      </button>

      <div
        className={`${
          collapsed ? "w-20" : "w-[336px]"
        } bg-[#0D1931] text-white h-screen flex flex-col shadow-[7px_0px_6px_rgba(0,0,0,0.17)] transition-all duration-300`}
      >
        {/* LOGO */}
        {collapsed ? (
          <div className="p-5 flex justify-center">
            <img src="/logo_collapsed.svg" alt="Logo" className="w-8" />
          </div>
        ) : (
          <div className="p-6 ml-4">
            <img src="/logo.svg" alt="Logo" className="w-[235px]" />
          </div>
        )}

        {/* MENU */}
        <nav className="flex-1 px-4 space-y-2">
          {/* HOME */}
          <SidebarItem
            icon="/home.svg"
            label="Home"
            collapsed={collapsed}
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
          />

          {/* CONTROLE DE ACESSO */}
          <div className="relative">
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-gray-300 hover:bg-[#13294b] transition"
            >
              <div className="flex items-center gap-3">
               {openMenu ? <img src="/access_control-selected.svg" className="w-[24px]" /> : <img src="access_control.svg" className="w-[24px]" />}
                {!collapsed && (
                  <span className="text-sm font-semibold">Controle de Acesso</span>
                )}
              </div>

              {!collapsed && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {/* SUBMENU EXPANDIDO */}
            {!collapsed && (
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openMenu ? "max-h-40" : "max-h-0"
                }`}
              >
                <SidebarItem
                  icon="/user.svg"
                  label="Usuários"
                  collapsed={collapsed}
                  className="pl-10"
                  active={location.pathname === "/users" || location.pathname === "/users/create"}
                  onClick={() => navigate("/users")}
                />
              </div>
            )}

            {/* SUBMENU COLAPSADO */}
            {collapsed && openMenu && (
          
                <SidebarItem
                  icon="/user.svg"
                  collapsed={false}
                  className="px-2 py-2 text-xs"
                  active={location.pathname === "/users" || location.pathname === "/users/create"}
                  onClick={() => navigate("/users")}
                />
      
            )}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="p-8 text-xs text-gray-400">
          {!collapsed && (
            <>
              <p className="mb-2 text-white text-base">© WenLock</p>
              Powered by Connecthus
              <br />
              V0.0.0
            </>
          )}
        </div>
      </div>
    </aside>
  );
}


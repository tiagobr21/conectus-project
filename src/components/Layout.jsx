import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }) {
  const location = useLocation();

  const titles = {
    "/": "Home",
    "/users": "Usuários",

  };

  const title = titles[location.pathname] || "";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-5">
          <h1
            className="text-[35px] font-semibold mb-4"
            style={{ color: "#0B2B25" }}
          >
            {title}
          </h1>

          {children}
        </main>
      </div>
    </div>
  );
}
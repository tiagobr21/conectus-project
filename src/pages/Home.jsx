import { useEffect, useState } from "react";

export function Home() {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    if (users.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === users.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [users]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 overflow-hidden">
      
      <div>
        <div className="flex items-center text-[25px] font-semibold text-[#0D1931]">
          
          <span className="mr-2">Olá</span>

          <div className="relative h-[35px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {users.length > 0 ? (
                users.map((user) => (
                  <span
                    key={user.id}
                    className="min-w-full"
                  >
                    {user.name}!
                  </span>
                ))
              ) : (
                <span className="min-w-full">Millena !</span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-2 mb-6 text-[#0D1931] font-medium capitalize">
          {today}
        </p>
      </div>

   
      <div className="flex justify-center my-12">
        <img src="home-img.svg" alt="Avatar" className="w-[420px]" />
      </div>


      <div className="flex justify-center">
        <button
          className="
            px-20 py-4
            border
            rounded-[9px]
            text-[#0D1931]
            bg-transparent
            shadow-[0px_3px_6px_rgba(0,0,0,0.16)]
            border-[#272846]
            hover:bg-gray-50
            transition
            text-[30px]
            font-semibold
          "
        >
          Bem-vindo ao WenLock!
        </button>
      </div>
    </div>
  );
}
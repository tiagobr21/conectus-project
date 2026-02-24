export function Header() {
  return (
    <header className="w-full h-[70px] bg-white flex items-center justify-end px-6 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
      
      <div className="relative">
        
        <div className="w-10 h-10 rounded-full bg-[#0D1931] text-white flex items-center justify-center font-semibold border-2 border-cyan-400">
          MS
        </div>

        <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></span>
      </div>
      
    </header>
  );
}
export function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
  className = "",
}) {
  
  const [name, ext] = icon.split(".");

  const iconSrc = active ? `${name}-selected.${ext}` : icon;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-cyan-500 text-black font-medium"
          : "text-gray-300 hover:bg-[#13294b]"
      } ${className}`}
    >
      <img
        src={iconSrc}
        alt={label}
        className="w-[24px] h-[24px]"
      />

      {!collapsed && <span className="text-sm font-bold">{label}</span>}
    </div>
  );
}
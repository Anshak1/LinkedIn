export function TopELement2({ title, icon, flag, onClick }) {
  const showOnSmall = flag === true || flag === "true";

  return (
    <div onClick={onClick} className={`${showOnSmall ? "" : "hidden"} md:flex flex-col items-center justify-center px-1 sm:px-2 md:px-3 py-1 cursor-pointer text-gray-500 hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-200`}>
      <div className="flex justify-center">{icon}</div>
      <div className="block text-xs mt-px">
        {title}
      </div>
    </div>
  );
}
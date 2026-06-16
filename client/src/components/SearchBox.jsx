import { Search, X } from "lucide-react";
import { useState } from "react";

export function SearchBox() {
  const [activeSearch, setActiveSearch] = useState(false)
  return (
    <>
      {!activeSearch && <div className="block md:hidden cursor-pointer" onClick={() => setActiveSearch(prev => !prev)}>
        <Search size={25} className="text-black" />
      </div>}
      <div className={`${activeSearch ? 'flex' : 'hidden'} md:flex items-center justify-center gap-2 bg-[#edf3f8] px-3 py-2 rounded-md w-48 md:w-72 relative`}>
        <Search size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search Users.."
          className="bg-transparent outline-none w-full text-sm"
        />
        <X className="absolute -top-1 -right-1 cursor-pointer block sm:hidden" size={14} onClick={() => setActiveSearch(prev => !prev)}/>
      </div>
    </>
  );
}
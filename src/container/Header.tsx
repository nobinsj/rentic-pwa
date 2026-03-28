import { MapPin, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-[600px] items-center justify-between">
        {/* Location Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
            <MapPin size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">
              Current Location
            </span>
            <span className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
              Trivandrum, KL
            </span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 transition-all active:scale-95 dark:border-gray-800 dark:bg-gray-900">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-gray-900" />
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-[2px]">
            <img
              src="https://ui-avatars.com/api/?name=Nobin+S+Johns&background=fff&color=0D8ABC"
              alt="Profile"
              className="h-full w-full rounded-[10px] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

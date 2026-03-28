import { Home, CalendarDays, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const Footer = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Bookings", path: "/bookings", icon: CalendarDays },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="h-16 shrink-0 border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full items-center justify-around px-4 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center transition-transform active:scale-95",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-400 dark:text-gray-500",
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="mt-0.5 text-[10px] font-bold uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Footer;

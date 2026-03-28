import {
  User,
  CreditCard,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  // Mock User Data - In production, this comes from your Auth Context
  const user = {
    fullName: "Nobin S Johns",
    email: "nobin@example.com",
    mobile: "+91 98765 43210",
    licenseNumber: "KL-01-20230004567",
    role: "Premium Member",
  };

  const menuItems = [
    {
      icon: User,
      label: "Edit Personal Info",
      sub: "Name, Email, Mobile",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: ShieldCheck,
      label: "Login & Security",
      sub: "Password, Biometrics",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      sub: "UPI, Cards, Wallets",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Settings,
      label: "App Settings",
      sub: "Notifications, Dark Mode",
      color: "text-orange-600 bg-orange-50",
    },
  ];

  const handleLogout = () => {
    // Firebase signOut logic here
    console.log("Logging out...");
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-xl shadow-blue-600/20">
            <img
              src={`https://ui-avatars.com/api/?name=${user.fullName}&background=fff&color=2563eb&size=128`}
              alt="Profile"
              className="h-full w-full rounded-[22px] object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white dark:border-gray-950">
            <ShieldCheck size={16} />
          </div>
        </div>
        <h2 className="mt-4 text-xl font-extrabold text-gray-900 dark:text-gray-100">
          {user.fullName}
        </h2>
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {user.role}
        </p>
      </div>

      {/* Stats / Quick Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gray-50 p-4 dark:bg-gray-900">
          <p className="text-[10px] font-bold uppercase text-gray-400">
            Total Bookings
          </p>
          <p className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
            12
          </p>
        </div>
        <div className="rounded-3xl bg-gray-50 p-4 dark:bg-gray-900">
          <p className="text-[10px] font-bold uppercase text-gray-400">
            License Status
          </p>
          <p className="text-lg font-extrabold text-green-600">Verified</p>
        </div>
      </div>

      {/* Account Menu */}
      <div className="space-y-3">
        <h3 className="px-1 text-sm font-bold text-gray-400 uppercase tracking-wider">
          Account Settings
        </h3>
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex w-full items-center justify-between border-b border-gray-50 p-4 last:border-0 active:bg-gray-50 dark:border-gray-800 dark:active:bg-gray-800/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} dark:bg-opacity-10`}
                >
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Support & Legal */}
      <div className="space-y-3">
        <h3 className="px-1 text-sm font-bold text-gray-400 uppercase tracking-wider">
          Support
        </h3>
        <div className="rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
          <button className="flex w-full items-center justify-between p-4 text-sm font-bold text-gray-900 dark:text-gray-100">
            <span>Help Center</span>
            <ExternalLink size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full border-red-100 py-7 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:hover:bg-red-900/20"
      >
        <LogOut className="mr-2" size={18} />
        Sign Out
      </Button>

      <p className="text-center text-[10px] font-medium text-gray-400">
        Rentic v1.0.4 • Made with ❤️ in Trivandrum
      </p>
    </div>
  );
};

export default Profile;

import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingCard } from "./BookingCard";
import type { BookingProps } from "@/types";
import { mockTimestamp } from "@/helpers/utils";

const TABS = ["Active", "Completed", "Cancelled"];

export const MOCK_BOOKINGS: BookingProps[] = [
  {
    id: "BK-9901",
    carId: "car-123",
    userId: "user-456",
    carName: "Fronx",
    brand: "Nexa",
    image:
      "https://www.popularmaruti.com/blog/wp-content/uploads/2023/07/Maruti-Suzuki-FRONX.jpg",
    startDate: mockTimestamp("2026-03-28"),
    endDate: mockTimestamp("2026-03-30"),
    totalPrice: 3200,
    status: "Active",
    paymentStatus: "paid",
    createdAt: mockTimestamp("2026-03-25"),
  },
  {
    id: "BK-8822",
    carId: "car-789",
    userId: "user-456",
    carName: "Nexon EV",
    brand: "Tata",
    image:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/141125/nexon-ev-exterior-right-front-three-quarter-3.jpeg?isig=0",
    startDate: mockTimestamp("2026-02-12"),
    endDate: mockTimestamp("2026-02-15"),
    totalPrice: 6600,
    status: "Completed",
    paymentStatus: "paid",
    createdAt: mockTimestamp("2026-02-10"),
  },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const filteredBookings = MOCK_BOOKINGS.filter((b) => b.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          My Bookings
        </h1>
        <p className="text-sm text-gray-500">
          Track your rides and trip history
        </p>
      </div>

      {/* Segmented Control (Tabs) */}
      <div className="flex rounded-2xl bg-gray-100 p-1 dark:bg-gray-900">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-xs font-bold transition-all",
              activeTab === tab
                ? "bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900">
              <Calendar size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              No {activeTab} Bookings
            </h3>
            <p className="max-w-[200px] text-sm text-gray-500">
              You don't have any bookings in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;

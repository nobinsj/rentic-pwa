import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { BookingCard } from "./BookingCard";
import { getMyBookings } from "@/services/user.api";
import type { BookingProps } from "@/types";

const TABS = ["ACTIVE", "COMPLETED", "CANCELLED"] as const;

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("ACTIVE");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<BookingProps[]>({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
  });

  const filteredBookings = useMemo(() => {
    return data.filter((booking) => {
      const status = booking.bookingStatus;

      if (activeTab === "ACTIVE") {
        return (
          status === "REQUESTED" ||
          status === "CONFIRMED" ||
          status === "ONGOING"
        );
      }

      if (activeTab === "COMPLETED") {
        return status === "COMPLETED";
      }

      if (activeTab === "CANCELLED") {
        return status === "CANCELLED" || status === "REJECTED";
      }

      return false;
    });
  }, [activeTab, data]);

  // LOADING
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <div className="h-7 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-3xl bg-gray-100 dark:bg-gray-900"
            />
          ))}
        </div>
      </div>
    );
  }

  // ERROR
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20">
          <Calendar size={32} className="text-red-400" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Failed to load bookings
        </h3>

        <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          My Bookings
        </h1>

        <p className="text-sm text-gray-500">
          Track your rides and booking history
        </p>
      </div>

      {/* TABS */}
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

      {/* LIST */}
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
            <p className="max-w-[240px] text-sm text-gray-500">
              You don't have any bookings in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;

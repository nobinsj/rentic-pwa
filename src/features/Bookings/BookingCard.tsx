import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingProps } from "@/types";

export const BookingCard = ({ booking }: { booking: BookingProps }) => {
  const statusColors = {
    Active: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    Completed: "text-green-600 bg-green-50 dark:bg-green-900/20",
    Cancelled: "text-red-600 bg-red-50 dark:bg-red-900/20",
  };

  // Helper to format the Firebase Timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== "function") return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all active:scale-[0.98] dark:border-gray-800 dark:bg-gray-900">
      <div className="flex gap-4">
        {/* Car Image Thumbnail */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800">
          <img
            src={booking.image}
            alt={booking.carName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {booking.brand}
              </p>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {booking.carName}
              </h3>
            </div>
            <span
              className={cn(
                "rounded-lg px-2 py-1 text-[10px] font-bold uppercase",
                statusColors[booking.status],
              )}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Calendar size={14} className="text-gray-400" />
              <span>{formatDate(booking.startDate)}</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />

            <div className="flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-gray-100">
              ₹{booking.totalPrice.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Action Icon */}
        <div className="flex items-center">
          <div className="rounded-full bg-gray-50 p-1 dark:bg-gray-800">
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

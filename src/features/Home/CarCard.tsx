import { Fuel, Gauge, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarProps {
  name: string;
  brand: string;
  fuelType: string;
  transmission: string;
  pricePerDay: number | string;
  image: string;
  status: string;
  id: string;
}

export const CarCard = ({
  car,
  onBookClick,
}: {
  car: CarProps;
  onBookClick: any;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Wishlist Button */}
      <button className="absolute top-5 right-5 z-10 rounded-full bg-white/80 p-2 backdrop-blur-md transition-colors hover:bg-white dark:bg-gray-800/80">
        <Heart size={18} className="text-gray-400 hover:text-red-500" />
      </button>

      {/* Car Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 rounded-xl bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          ₹{car.pricePerDay}/day
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-3 px-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {car.brand}
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {car.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded-lg dark:bg-green-900/20">
            <ShieldCheck size={12} /> {car.status}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="flex items-center gap-4 border-t border-gray-50 pt-3 text-gray-500 dark:border-gray-800">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Fuel size={14} className="text-gray-400" />
            {car.fuelType}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Gauge size={14} className="text-gray-400" />
            {car.transmission}
          </div>
        </div>

        <Button
          className="w-full rounded-xl py-6 font-bold"
          onClick={() => onBookClick(car.id)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

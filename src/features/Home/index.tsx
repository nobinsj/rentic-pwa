import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CarCard } from "./CarCard";
import { useQuery } from "@tanstack/react-query";
import { getCarListForBooking } from "@/services/user.api";
import { useNavigate } from "react-router";
import type { CarListT } from "@/types";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const { data, isLoading, isError } = useQuery<CarListT[], Error>({
    queryKey: ["cars"],
    queryFn: getCarListForBooking,
  });

  const dynamicBrands = useMemo(() => {
    if (!data) return ["All"];
    const uniqueBrands = [...new Set(data.map((car) => car.brand))].filter(
      Boolean,
    );
    return ["All", ...uniqueBrands];
  }, [data]);

  // 2. Filter logic
  const filteredCars = useMemo(() => {
    if (!data) return [];

    return data.filter((car) => {
      const matchesBrand =
        selectedBrand === "All" || car.brand === selectedBrand;
      const matchesSearch =
        car.name?.toLowerCase().includes(search.toLowerCase()) ||
        car.brand?.toLowerCase().includes(search.toLowerCase());

      return matchesBrand && matchesSearch;
    });
  }, [data, search, selectedBrand]);

  const handleNavigateBooking = (carId: string) => {
    navigate(`/booking/${carId}`);
  };

  if (isLoading)
    return (
      <p className="p-10 text-center text-gray-500 font-medium">
        Loading cars...
      </p>
    );
  if (isError)
    return (
      <p className="p-10 text-center text-red-500 font-medium">
        Error loading cars
      </p>
    );

  return (
    <div className="space-y-6">
      {/* Search & Filter Row */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-400" />}
            className="h-12 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-600/10 dark:bg-gray-900"
          />
        </div>
        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 active:scale-90">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Horizontal Brand Chips - Now mapping from dynamicBrands */}
      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {dynamicBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`whitespace-nowrap rounded-xl px-6 py-2.5 text-xs font-bold transition-all active:scale-95 ${
              selectedBrand === brand
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Car List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
            Available Cars ({filteredCars.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredCars.length > 0 ? (
            filteredCars.map((item) => (
              <CarCard
                key={item.id || item.id}
                car={item}
                onBookClick={handleNavigateBooking}
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center">
              <p className="text-gray-500 font-medium">
                No cars found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

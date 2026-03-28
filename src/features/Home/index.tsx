import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CarCard } from "./CarCard";

const BRANDS = ["All", "Nexa", "Tata", "Mahindra", "Hyundai", "Toyota"];

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

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

      {/* Horizontal Brand Chips */}
      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {BRANDS.map((brand) => (
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
            Available Cars
          </h2>
          <button className="text-xs font-bold text-blue-600">View All</button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Mapping through your data here */}
          <CarCard
            car={{
              brand: "Nexa",
              name: "Fronx",
              fuelType: "Petrol",
              transmission: "Manual",
              pricePerDay: 1600,
              status: "available",
              image:
                "https://www.popularmaruti.com/blog/wp-content/uploads/2023/07/Maruti-Suzuki-FRONX.jpg",
            }}
          />
          <CarCard
            car={{
              brand: "Nexa",
              name: "Fronx",
              fuelType: "Petrol",
              transmission: "Manual",
              pricePerDay: 1600,
              status: "available",
              image:
                "https://www.popularmaruti.com/blog/wp-content/uploads/2023/07/Maruti-Suzuki-FRONX.jpg",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

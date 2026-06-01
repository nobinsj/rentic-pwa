import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Clock3,
  CreditCard,
  CarFront,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getCarById } from "@/services/user.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";

type RouteParams = {
  carId: string;
};

const BookACar = () => {
  const navigate = useNavigate();

  const { carId } = useParams<RouteParams>();

  const today = new Date().toISOString().slice(0, 16);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [pickupLocation, setPickupLocation] = useState("");

  const [dropLocation, setDropLocation] = useState("");

  const [driverAge, setDriverAge] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [coupon, setCoupon] = useState("");

  const [notes, setNotes] = useState("");

  const [deliveryRequired, setDeliveryRequired] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const { data: car, isLoading } = useQuery({
    queryKey: ["car", carId],

    queryFn: () => getCarById(carId!),

    enabled: !!carId,
  });

  const totalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;

    const start = new Date(pickupDate);

    const end = new Date(returnDate);

    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    return diff > 0 ? diff : 0;
  }, [pickupDate, returnDate]);

  const basePrice = useMemo(() => {
    if (!car) return 0;

    return totalDays * car.ratePerHour;
  }, [car, totalDays]);

  const deliveryCharge = deliveryRequired ? 500 : 0;

  const tax = Math.round(basePrice * 0.12);

  const discount =
    coupon === "RENTIC100" ? 100 : coupon === "WELCOME50" ? 50 : 0;

  const totalPrice = basePrice + deliveryCharge + tax - discount;

  const validateBooking = () => {
    const newErrors: any = {};

    // PICKUP DATE
    if (!pickupDate) {
      newErrors.pickupDate = "Pickup date & time is required";
    }

    // RETURN DATE
    if (!returnDate) {
      newErrors.returnDate = "Return date & time is required";
    }

    // DATE VALIDATION
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);

      const end = new Date(returnDate);

      if (end <= start) {
        newErrors.returnDate = "Return date must be after pickup";
      }

      const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      if (diffHours < 6) {
        newErrors.returnDate = "Minimum rental duration is 6 hours";
      }
    }

    // PICKUP LOCATION
    if (!pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    } else if (pickupLocation.trim().length < 3) {
      newErrors.pickupLocation = "Enter valid pickup location";
    }

    // DROP LOCATION
    if (!dropLocation.trim()) {
      newErrors.dropLocation = "Drop location is required";
    } else if (dropLocation.trim().length < 3) {
      newErrors.dropLocation = "Enter valid drop location";
    }

    // DRIVER AGE
    if (!driverAge) {
      newErrors.driverAge = "Driver age is required";
    } else if (Number(driverAge) < 21) {
      newErrors.driverAge = "Driver must be at least 21 years old";
    } else if (Number(driverAge) > 75) {
      newErrors.driverAge = "Maximum driver age is 75";
    }

    // PHONE NUMBER
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^(?:\+91)?[6-9]\d{9}$/.test(phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Enter valid Indian phone number";
    }

    // COUPON
    if (coupon && coupon !== "RENTIC100" && coupon !== "WELCOME50") {
      newErrors.coupon = "Invalid coupon code";
    }

    // NOTES
    if (notes.length > 300) {
      newErrors.notes = "Notes should be less than 300 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const bookingMutation = useMutation({
    mutationFn: (data: any) => api.post(API_ENDPOINTS.CREATE_BOOKING, data),
    onSuccess: () => {
      navigate("/bookings");
      toast.success("Booking request submitted successfully");
    },
    onError: (err) => {
      toast.error(err?.message || "Booking failed");
    },
  });

  const handleBooking = () => {
    const isValid = validateBooking();

    if (!isValid) {
      toast.error("Please fix validation errors");

      return;
    }

    const bookingPayload = {
      carId,

      pickupDate: new Date(pickupDate).getTime(),

      returnDate: new Date(returnDate).getTime(),

      pickupLocation,

      dropLocation,

      driverAge: Number(driverAge),

      phoneNumber,

      notes,

      coupon,

      deliveryRequired,

      totalDays,

      basePrice,

      deliveryCharge,

      tax,

      discount,

      totalPrice,

      paymentMethod: "CASH",
    };

    bookingMutation.mutate(bookingPayload);
  };

  const canBook =
    pickupDate &&
    returnDate &&
    pickupLocation &&
    dropLocation &&
    driverAge &&
    phoneNumber &&
    totalDays > 0 &&
    !bookingMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="text-sm font-medium text-gray-400">
            Loading car details...
          </p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="font-medium text-red-500">Car not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-56 dark:from-black dark:to-gray-950">
      {/* HERO */}
      <div className="relative h-[380px] overflow-hidden">
        <img
          src={car.carImage}
          alt={car.carName}
          className="h-full w-full scale-105 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

        {/* TOP BAR */}
        <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between p-5">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
            <Heart className="text-white" size={20} />
          </button>
        </div>

        {/* CAR INFO */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-5 pb-10 text-white">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-xl">
              {car.manufacturer}
            </div>

            <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-200 backdrop-blur-xl">
              <ShieldCheck size={12} />
              {car.status}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[40px] font-black leading-none tracking-tight">
                {car.carName}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <MapPin size={15} />
                Trivandrum, Kerala
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">₹{car.ratePerHour}</span>

                <span className="mb-1 text-sm text-white/70">/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-30 -mt-4 rounded-t-[40px] border border-white/50 bg-white px-5 pt-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950">
        {/* SPECS */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-gray-100 p-3 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/40">
              <Fuel className="text-blue-600" size={18} />
            </div>

            <p className="text-xs text-gray-500">Fuel</p>

            <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {car.fuelType}
            </h3>
          </div>

          <div className="rounded-3xl bg-gray-100 p-3 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/40">
              <Gauge className="text-blue-600" size={18} />
            </div>

            <p className="text-xs text-gray-500">Transmission</p>

            <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {car.transmissionType}
            </h3>
          </div>

          <div className="rounded-3xl bg-gray-100 p-3 dark:bg-gray-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/40">
              <Users className="text-blue-600" size={18} />
            </div>

            <p className="text-xs text-gray-500">Seats</p>

            <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              5 Seats
            </h3>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              About Car
            </h2>

            <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
              <Star size={14} fill="currentColor" />
              4.9
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Experience premium comfort and smooth driving performance with the{" "}
            {car.carName}. Perfect for city rides, business travel and long
            drives.
          </p>
        </div>

        {/* BOOKING */}
        <div className="mt-8 rounded-[32px] bg-gradient-to-br from-gray-100 to-gray-50 p-5 shadow-sm dark:from-gray-900 dark:to-gray-950">
          <div className="mb-5 flex items-center gap-2">
            <CalendarDays className="text-blue-600" size={22} />

            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Booking Details
            </h2>
          </div>

          <div className="space-y-5">
            {/* PICKUP DATE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Pickup Date & Time
              </label>

              <Input
                type="datetime-local"
                min={today}
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    pickupDate: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.pickupDate ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.pickupDate && (
                <p className="mt-1 text-xs text-red-500">{errors.pickupDate}</p>
              )}
            </div>

            {/* RETURN DATE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Return Date & Time
              </label>

              <Input
                type="datetime-local"
                min={pickupDate || today}
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    returnDate: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.returnDate ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.returnDate && (
                <p className="mt-1 text-xs text-red-500">{errors.returnDate}</p>
              )}
            </div>

            {/* PICKUP LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Pickup Location
              </label>

              <Input
                placeholder="Eg: Trivandrum Airport"
                value={pickupLocation}
                onChange={(e) => {
                  setPickupLocation(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    pickupLocation: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.pickupLocation
                    ? "border-red-500"
                    : "border-transparent"
                }`}
              />

              {errors.pickupLocation && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pickupLocation}
                </p>
              )}
            </div>

            {/* DROP LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Drop Location
              </label>

              <Input
                placeholder="Eg: Technopark"
                value={dropLocation}
                onChange={(e) => {
                  setDropLocation(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    dropLocation: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.dropLocation ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.dropLocation && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.dropLocation}
                </p>
              )}
            </div>

            {/* DRIVER AGE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Driver Age
              </label>

              <Input
                type="number"
                placeholder="Enter age"
                value={driverAge}
                onChange={(e) => {
                  setDriverAge(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    driverAge: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.driverAge ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.driverAge && (
                <p className="mt-1 text-xs text-red-500">{errors.driverAge}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Phone Number
              </label>

              <Input
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    phoneNumber: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.phoneNumber ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* PAYMENT */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Payment Method
              </label>

              <div className="rounded-3xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-green-700 dark:text-green-400">
                      Cash Payment
                    </h3>

                    <p className="text-xs text-green-700/80 dark:text-green-300/80">
                      Pay directly during vehicle pickup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DELIVERY */}
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 dark:bg-black">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/40">
                  <CarFront className="text-blue-600" size={18} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Doorstep Delivery
                  </h3>

                  <p className="text-xs text-gray-500">
                    Car delivered to your location
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeliveryRequired(!deliveryRequired)}
                className={`h-7 w-12 rounded-full transition ${
                  deliveryRequired
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white transition ${
                    deliveryRequired ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* COUPON */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-300">
                Coupon Code
              </label>

              <Input
                placeholder="RENTIC100"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value.toUpperCase());

                  setErrors((prev: any) => ({
                    ...prev,
                    coupon: "",
                  }));
                }}
                className={`h-14 rounded-2xl border bg-white shadow-sm dark:bg-black ${
                  errors.coupon ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.coupon && (
                <p className="mt-1 text-xs text-red-500">{errors.coupon}</p>
              )}
            </div>

            {/* NOTES */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Additional Notes
                </label>

                <p className="text-xs text-gray-400">{notes.length}/300</p>
              </div>

              <Textarea
                rows={4}
                maxLength={300}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);

                  setErrors((prev: any) => ({
                    ...prev,
                    notes: "",
                  }));
                }}
                placeholder="Special instructions..."
                className={`rounded-3xl border bg-white shadow-sm dark:bg-black ${
                  errors.notes ? "border-red-500" : "border-transparent"
                }`}
              />

              {errors.notes && (
                <p className="mt-1 text-xs text-red-500">{errors.notes}</p>
              )}
            </div>
          </div>

          {/* PRICE SUMMARY */}
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-black">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-600" size={18} />

              <h3 className="font-black text-gray-900 dark:text-white">
                Price Summary
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  ₹{car.ratePerHour} × {totalDays} days
                </p>

                <p className="font-bold text-gray-900 dark:text-white">
                  ₹{basePrice}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Delivery Charge</p>

                <p className="font-bold text-gray-900 dark:text-white">
                  ₹{deliveryCharge}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Tax & Fees</p>

                <p className="font-bold text-gray-900 dark:text-white">
                  ₹{tax}
                </p>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-green-600">Coupon Discount</p>

                  <p className="font-bold text-green-600">-₹{discount}</p>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    Total Payable
                  </p>

                  <p className="text-3xl font-black text-blue-600">
                    ₹{totalPrice || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SAFETY */}
          <div className="mt-5 rounded-3xl bg-green-50 p-4 dark:bg-green-950/20">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 text-green-600" size={18} />

              <div>
                <h4 className="font-bold text-green-700 dark:text-green-400">
                  Safe & Verified Booking
                </h4>

                <p className="mt-1 text-xs leading-6 text-green-700/80 dark:text-green-300/80">
                  Free cancellation within 24 hours. Secure booking and verified
                  vehicle inspection included.
                </p>
              </div>
            </div>
          </div>

          {/* POLICIES */}
          <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm dark:bg-black">
            <h3 className="mb-3 font-bold text-gray-900 dark:text-white">
              Rental Policies
            </h3>

            <ul className="space-y-3 text-xs leading-6 text-gray-500">
              <li>• Minimum driver age: 21 years</li>

              <li>• Valid driving license required during pickup</li>

              <li>• Fuel should be returned at same level</li>

              <li>• Late returns may incur extra charges</li>

              <li>• Security deposit may be collected during pickup</li>
            </ul>
          </div>

          {/* INFO */}
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <Clock3 size={14} />
            Booking confirmation usually takes less than 10 minutes
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white/95 p-4 backdrop-blur-xl dark:border-gray-800 dark:bg-black/95">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Payable</p>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              ₹{totalPrice || 0}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Duration</p>

            <h3 className="font-bold text-gray-900 dark:text-white">
              {totalDays} Days
            </h3>
          </div>
        </div>

        <Button
          disabled={!canBook}
          onClick={handleBooking}
          className="h-16 w-full rounded-3xl text-base font-black shadow-2xl shadow-blue-600/30 disabled:opacity-50"
        >
          {bookingMutation.isPending
            ? "Processing Booking..."
            : `Confirm Booking • ₹${totalPrice || 0}`}
        </Button>
      </div>
    </div>
  );
};

export default BookACar;

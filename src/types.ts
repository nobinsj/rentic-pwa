import type { Timestamp } from "firebase/firestore";

export type BookingStatus = "Active" | "Completed" | "Cancelled";
export type CarStatus = "available" | "booked" | "maintenance";

export interface CarProps {
  id: string; // Document ID from Firestore
  brand: string; // e.g., "Nexa"
  name: string; // e.g., "Fronx"
  fuelType: string; // e.g., "Petrol"
  transmission: string; // e.g., "Manual"
  image: string; // URL string
  pricePerDay: number; // int64
  status: CarStatus; // "available" | "booked"
  vendorId: string; // Owner ID
  createdAt: Timestamp; // Firestore Timestamp
}

export type BookingStatusT =
  | "REQUESTED"
  | "CONFIRMED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaymentMethod = "CASH";

export interface BookingProps {
  id: string;

  // USER
  userId: string;

  // CAR
  carId: string;
  carName: string;
  carImage: string;
  carRatePerDay: number;

  // BOOKING DATES (epoch milliseconds)
  pickupDate: number;
  returnDate: number;

  totalDays: number;

  // LOCATIONS
  pickupLocation: string;
  dropLocation: string;

  // CUSTOMER DETAILS
  driverAge: number;
  phoneNumber: string;
  notes?: string;

  // DELIVERY
  deliveryRequired: boolean;
  deliveryCharge: number;

  // PRICING
  basePrice: number;
  tax: number;
  discount: number;
  totalPrice: number;

  // PAYMENT
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  // BOOKING
  bookingStatus: BookingStatusT;

  // OPTIONAL
  coupon?: string;
  cancellationReason?: string;

  // AUDIT
  createdAt: number;
  updatedAt: number;
}

export type CarListT = {
  id: string;
  image: string;
  pricePerDay: string | number;
  brand: string;
  name: string;
  fuelType: string;
  transmission: string;
  status: string;
  businessName: string;
};

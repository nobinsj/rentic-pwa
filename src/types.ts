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

export interface BookingProps {
  id: string; // Unique Booking ID
  carId: string; // Reference to the Car document
  userId: string; // Reference to the User (you)
  carName: string; // Denormalized for quick display
  brand: string; // Denormalized for quick display
  image: string; // Denormalized for quick display
  startDate: Timestamp; // When the rental starts
  endDate: Timestamp; // When the rental ends
  totalPrice: number; // calculated (pricePerDay * days)
  status: BookingStatus; // "Active" | "Completed" | "Cancelled"
  paymentStatus: "paid" | "pending";
  createdAt: Timestamp;
}

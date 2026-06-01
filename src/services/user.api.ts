import api from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";

export const fetchUser = async (): Promise<any> => {
  const response = await api.get(API_ENDPOINTS.USER_ME);
  return response.data;
};

export const getCarListForBooking = async (): Promise<any> => {
  const response = await api.get(API_ENDPOINTS.LIST_CARS);
  return response.data;
};

export const getCarById = async (id: string): Promise<any> => {
  const response = await api.get(API_ENDPOINTS.GET_CAR_DETAIL + id);
  return response.data;
};

export const getMyBookings = async (): Promise<any> => {
  const res = await api.get(API_ENDPOINTS.GET_BOOKING);
  return res.data;
};

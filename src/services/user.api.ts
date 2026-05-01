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

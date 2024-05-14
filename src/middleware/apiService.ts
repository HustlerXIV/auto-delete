import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://dummyjson.com/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url);
    const { data } = response;

    return data;
  } catch (error) {
    throw new Error("Error getting data");
  }
};

export default axiosInstance;

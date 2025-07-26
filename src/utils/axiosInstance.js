import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createAxiosInstance = async (token) =>
   axios.create({
      baseURL: backendUrl,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

import { createAxiosInstance } from "../utils/axiosInstance";

export const loginUser = async (state, credentials, token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.post(`/auth/${state}`, credentials);
   return data;
};

export const logoutUser = () => {
   localStorage.removeItem("token");
};

export const updateUserProfile = async (profileData, token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.put(
      `/auth/update-profile`,
      profileData
   );
   return data;
};

export const checkAuthStatus = async (token) => {
   const axiosInstance = await createAxiosInstance(token);
   const { data } = await axiosInstance.get("/auth/check-auth");
   return data;
};

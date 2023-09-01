import axios from "axios";
import { Baseurl } from "../constants/endpoints";

export const apiInstance = axios.create({
  baseURL: Baseurl,
});

export const uninterceptedApiInstance = axios.create({
  baseURL: Baseurl,
});

// request interseptor
apiInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (token) {
      // Add the token to the request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

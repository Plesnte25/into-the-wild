// api.js - UPDATED
import axios from "axios";
import { toast } from "react-toastify";

// Use environment variables for base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://into-the-wild-2gp2.onrender.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Consolidated API functions
export const loginUser = async (emailorphone, password) => {
  try {
    return await api.post("/auth/login", { emailorphone, password });
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};

export const registerUser = async (name, emailorphone, password) => {
  try {
    return await api.post("/auth/register", { name, emailorphone, password });
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
    throw error;
  }
};

export const googleSignup = async (response) => {
  try {
    return await api.post("/auth/google-signup", response);
  } catch (error) {
    toast.error(error.response?.data?.message || "Google signup failed");
    throw error;
  }
};

// ADD THIS NEW FUNCTION
export const fetchProperties = async () => {
  try {
    const response = await api.get("/api/v1/properties");
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    toast.error("Failed to load properties");
    throw error;
  }
};

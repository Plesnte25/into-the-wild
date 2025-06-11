// // api.js
// import axios from "axios";
// import { BASE_URL } from "./utils/baseurl";
// import { toast } from "react-toastify";

// export const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export const loginUser = async (emailorphone, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ emailorphone, password }),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Login failed");
//     }
//     if (response.status === 204) {
//       // console.log(response);
//       return response;
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error during login:", error);
//     throw error;
//   }
// };
// export const registerUser = async (name, emailorphone, password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, emailorphone, password }),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       toast.error(errorData.error);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Error during registration:", error);
//     toast.error(error.message);
//   }
// };

// export const googleSignup = async (response) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/auth/google-signup`, response);
//     // console.log(res);
//     if (res.status === 201 || res.status === 200) {
//       return res;
//     }
//   } catch (err) {
//     // console.log(err);
//     toast.error(err.response.data.message);
//     throw err;
//   }
// };


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

// // export const BASE_URL = "https://intothewilds-backend.onrender.com/api/v1";
// export const BASE_URL = "https://intothewilds-backend-ghye.onrender.com/api/v1";
// //  export const BASE_URL = "http://localhost:5000/api/v1";

import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;   // <-- NEW

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;


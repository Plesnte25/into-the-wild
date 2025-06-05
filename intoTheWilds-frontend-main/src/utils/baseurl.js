import axios from "axios";

// export const BASE_URL = import.meta.env.VITE_API_BASE_URL;   // <-- NEW

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export default api;

export const api = axios.create({
  baseURL: "https://into-the-wild-2gp2-onrender.com/api/v1",
  withCredentials: true,
});


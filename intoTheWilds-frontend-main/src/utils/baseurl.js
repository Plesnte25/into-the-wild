import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://into-the-wild-2gp2-onrender.com/api/v1";   // <-- NEW

// export const api = axios.create({
//   baseURL: "https://into-the-wild-2gp2-onrender.com/api/v1",
//   withCredentials: true,
// });
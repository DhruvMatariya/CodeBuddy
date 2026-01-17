import axios from "axios";
console.log("BACKEND URL =", import.meta.env.VITE_BACKEND_URL);
const axiosInstance = axios.create({
  baseURL: "https://codebuddy-xogz.onrender.com/api",
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

export default axiosInstance;
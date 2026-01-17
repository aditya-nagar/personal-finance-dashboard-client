import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-dashboard-backend-2dkk.onrender.com/api",
  withCredentials: true,
});

export default API;
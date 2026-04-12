import axios from "axios";

// Create one Axios instance for all API requests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "https://busbuddy-backend-c6dg.onrender.com/api",
  //"http://localhost:4000/api", // Backend URL
});

export default API;

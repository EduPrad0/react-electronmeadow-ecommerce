import axios from "axios";

const api = axios.create({
  baseURL: window.location.host.includes("local")
    ? "http://localhost:3333"
    : "http://192.168.50.134:3333",
});

export default api;

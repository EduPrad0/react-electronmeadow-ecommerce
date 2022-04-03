import axios from "axios";

const api = axios.create({
  baseURL: window.location.host.includes("local")
    ? "http://localhost:3333"
    : "https://electronmeadow.herokuapp.com",
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://contacts-ddf8.onrender.com/",
});

export default api;

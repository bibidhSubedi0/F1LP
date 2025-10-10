import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:5138/api/predictions", // controller base
});

export default api;


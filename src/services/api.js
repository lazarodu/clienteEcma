import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3333",
});
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
export default api;

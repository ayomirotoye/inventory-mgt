import axios from "axios";

const BASE_URL = "http://lag-s-04315:8084/api/";

const TOKEN = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // header: { token: `Bearer ${TOKEN}` },
});

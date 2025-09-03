import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.apiUrl ?? "http://localhost:8000",
  withCredentials: false,
});

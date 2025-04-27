import axios from 'axios';
import { DEFAULT_BASE_URL } from "../config/constants";
export function createAPI(baseURL = DEFAULT_BASE_URL) {
  return axios.create({ baseURL });
}
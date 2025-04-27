import axios from 'axios';
import { DEFAULT_BASE } from "../config/constants";
export function createAPI(baseURL = DEFAULT_BASE) {
  return axios.create({ baseURL });
}
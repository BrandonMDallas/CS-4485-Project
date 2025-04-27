import axios from 'axios';
const DEFAULT_BASE = 'http://localhost:8080';

export function createAPI(baseURL = DEFAULT_BASE) {
  return axios.create({ baseURL });
}
import axios from 'axios';

import { DEFAULT_BASE_URL } from "../config/constants";

class APIClient {

  constructor(baseURL = DEFAULT_BASE_URL) {
    this.axios = axios.create({ baseURL });
  }

  setBaseURL(url) {
    this.axios.defaults.baseURL = url;
  }

  getBaseURL() {
    return this.axios.defaults.baseURL;
  }

  get(path, config) {
    return this.axios.get(path, config);
  }

  post(path, data, config) {
    return this.axios.post(path, data, config);
  }

  put(path, data, config) {
    return this.axios.put(path, data, config);
  }

  patch(path, data, config) {
    return this.axios.patch(path, data, config);
  }

  delete(path, config) {
    return this.axios.delete(path, config);
  }
}

const api = new APIClient();
export default api;
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import axiosInstance from '../api/axios';

const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      config => {
        if (auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // (Optional) Add a response interceptor to handle 401s, token refresh, etc.

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);

  return axiosInstance;
};

export default useAxiosPrivate;
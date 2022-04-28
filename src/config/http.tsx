import axios, { AxiosRequestConfig } from "axios";
const API_URL = "http://10.68.233.14:8080/";
const REQUEST_TIMEOUT = 60000;

export const http = (config: AxiosRequestConfig<any>) => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: false,
    maxRedirects: 10,
  });
  instance.interceptors.request.use(
    (config) => {
      if (localStorage.token && config.headers) {
        // 如果存在 token 就携带
        config.headers.authorization = JSON.parse(localStorage.token);
      }
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      return response.data;
    },
    function (error) {
      // 对响应错误做点什么
      if (error.response && error.response.status === 401) {
        error = error.response.status;
      }
      return Promise.reject(error);
    }
  );
  return instance(config);
};

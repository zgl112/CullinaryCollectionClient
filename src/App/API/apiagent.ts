import axios, {  AxiosResponse } from 'axios';
import { ILogin, IProducts, IRegister, IToken } from '../Models/user';

axios.defaults.baseURL = "https://localhost:44386/";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("jwt");
        if(token) config.headers.Authorization = ` Bearer ${token} `;
        return config;
    },
    error => { 
        return Promise.reject(error)
    }
);
axios.interceptors.response.use(undefined, error => {
  const { status } = error.response;

  if (error.message === "Network Error" && !error.response) {
    // Handle network errors
  }

  if (status === 404) {
    // Handle 404 errors
  }

  if (status === 500) {
    // Handle 500 errors
  }

  return Promise.reject(error.response);
});

const respBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(respBody),
  post: (url: string, body: {}) => axios.post(url, body).then(respBody),
  put: (url: string, body: {}) => axios.put(url, body).then(respBody),
  delete: (url: string) => axios.delete(url).then(respBody),
};

export const user = {
  login: (form: ILogin): Promise<IToken> => requests.post("auth/login", form),
  getUser: (email: string): Promise<IRegister> => requests.get(`user/${email}`),
  register: (form: IRegister): Promise<IToken> => requests.post("auth/register", form),
};

export const products = {
  getProducts: (): Promise<IProducts[]> => requests.get("product/all"),
  add: (form: IProducts): Promise<IProducts> => requests.post("product/create", form),
  update: (id: string, form: IProducts): Promise<IProducts> => requests.put(`product/${id}`, form ),
  delete: (id: string): Promise<void> => requests.delete(`/product/${id}`)
};

import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import axiosClient from "config/axios";

export type AxiosPromise<T> = Promise<AxiosResponse<T>>;

class ApiService {
  static get = <Response>(
    url: string,
    auth = true,
    optionalHeaders: AxiosRequestHeaders | undefined = undefined,
    axiosConfig: AxiosRequestConfig<object> | undefined = undefined,
  ): AxiosPromise<Response> => {
    if (auth) return axiosClient.get(url, { headers: optionalHeaders, ...axiosConfig });
    return axios.get(url, { headers: optionalHeaders });
  };
}

export default ApiService;

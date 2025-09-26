import { AxiosPromise } from "axios";

const axiosData = <Data>(func: () => AxiosPromise<Data>): (() => Promise<Data>) => {
  return async () => {
    const res = await func();
    return res.data;
  };
};

export { axiosData };

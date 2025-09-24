import { AxiosPromise } from "axios";

function axiosData<Data>(func: () => AxiosPromise<Data>): () => Promise<Data> {
  return async () => {
    const res = await func();
    return res.data;
  };
}

export { axiosData };

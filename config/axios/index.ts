import axios from "axios";
import { request } from "config/axios/interceptors";

const client = axios.create();

client.interceptors.request.use(request);

export default client;

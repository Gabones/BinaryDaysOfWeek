import axios from "axios";

export const customAxios = axios.create({
    baseURL: import.meta.env.__API_BASE_URL__,
    timeout: 1000
});

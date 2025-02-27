// api.services.js
import useSWR from "swr";
import axios from "axios";

// Hàm fetcher sử dụng axios
const fetcher = (url) => axios.get(url).then((res) => res.data);

// Hàm fetchAllProducts cố định URL
export const fetchAllProducts = () => {
    return useSWR("http://localhost:8000/api/products", fetcher);
};

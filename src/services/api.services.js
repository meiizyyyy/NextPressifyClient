// api.services.js
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const fetchAllProducts = () => {
    return useSWR("http://localhost:8000/api/products", fetcher);
};

export const fetchBottomHeaderMenu = () => {
    return useSWR("http://localhost:8000/api/bottomHeaderMenu", fetcher);
};

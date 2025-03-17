// api.services.js
import useSWR from "swr";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const fetcher = (url) => axios.get(url).then((res) => res.data);

export const fetchAllProducts = (cursor = null) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/get-all-products-with-paginate?cursor=${cursor}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/get-all-products-with-paginate`;

	return useSWR(url, fetcher);
};

export const fetchBottomHeaderMenu = () => {
	return useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bottomHeaderMenu`, fetcher);
};

export const fetchHeaderMainMenu = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/menus/header-main-menu`,
		fetcher,
		{
			fallbackData: { data: { menu: [] } },
		},
	);
};
export const fetchHeaderCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/menus/header-collection`,
		fetcher,
		{
			fallbackData: { data: { menu: [] } },
		},
	);
};

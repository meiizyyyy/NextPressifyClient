"use client";
import useSWR from "swr";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const fetcher = (url) => axios.get(url).then((res) => res.data);

export const fetchAllProducts = (cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/get-all-products-with-paginate?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/get-all-products-with-paginate?sortKey=${sortKey}&reverse=${reverse}`;

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

export const fetchHomePageMarketing = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/home-page-marketing`,
		fetcher,
		{
			fallbackData: { data: [] },
		},
	);
};

export const fetchHomePageBanner = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/home-page-banner`,
		fetcher,
		{
			fallbackData: { data: [] },
		},
	);
};

export const fetchAllCollection = () => {
	return useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections`, fetcher, {
		fallbackData: { data: { collections: [] } },
	});
};

export const fetchBrandCategoriesCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/brand-categories`,
		fetcher,
		{
			fallbackData: { data: { collections: [] } },
		},
	);
};

export const fetchProductCategoriesCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/product-categories`,
		fetcher,
		{
			fallbackData: { data: { collections: [] } },
		},
	);
};

export const fetchHomeSliderCollections = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/home-slider-collections`,
		fetcher,
		{
			fallbackData: { data: { collections: [] } },
		},
	);
};

export const fetchCollectionByHandle = (handle, cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/${handle}?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/${handle}?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { products: [] } },
	});
};

export const searchProducts = (keyword, cursor = null, sortKey = "RELEVANCE", reverse = true) => {
	const params = new URLSearchParams({
		keyword,
		...(cursor && { cursor }),
		sortKey,
		reverse,
	});

	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${
		process.env.NEXT_PUBLIC_API_VER
	}/products/search?${params.toString()}`;

	return useSWR(url, fetcher);
};

export const fetchProductByHandle = (handle) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/${handle}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { product: null } },
	});
};

export const fetchNewsBlogs = (cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/news-blog?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/news-blog?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { articles: [], pageInfo: { hasNextPage: false, endCursor: null } } },
	});
};

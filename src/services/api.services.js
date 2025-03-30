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

	return useSWR(url, fetcher, { revalidateOnFocus: false });
};

export const fetchHeaderMainMenu = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/menus/header-main-menu`,
		fetcher,
		{
			// fallbackData: { data: { menu: [] } },
			revalidateOnFocus: false,
		},
	);
};
export const fetchHeaderCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/menus/header-collection`,
		fetcher,
		{
			// fallbackData: { data: { menu: [] } },
			revalidateOnFocus: false,
		},
	);
};

export const fetchHomePageMarketing = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/home-page-marketing`,
		fetcher,
		{
			// fallbackData: { data: [] },
			revalidateOnFocus: false,
		},
	);
};

export const fetchHomePageBanner = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/home-page-banner`,
		fetcher,
		{
			// fallbackData: { data: [] },
			revalidateOnFocus: false,
			revalidateIfStale: false,
		},
	);
};

export const fetchAllCollection = () => {
	return useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections`, fetcher, {
		// fallbackData: { data: { collections: [] } },
		revalidateOnFocus: false,
	});
};

export const fetchBrandCategoriesCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/brand-categories`,
		fetcher,
		{
			// fallbackData: { data: { collections: [] } },
			revalidateOnFocus: false,
			revalidateIfStale: false,
		},
	);
};

export const fetchProductCategoriesCollection = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/product-categories`,
		fetcher,
		{
			// fallbackData: { data: { collections: [] } },
			revalidateOnFocus: false,
			revalidateIfStale: false,
		},
	);
};

export const fetchHomeSliderCollections = () => {
	return useSWR(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/home-slider-collections`,
		fetcher,
		{
			fallbackData: { data: { collections: [] } },
			revalidateOnFocus: false,
		},
	);
};

export const fetchCollectionByHandle = (handle, cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/${handle}?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/collections/${handle}?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { products: [] } },
		revalidateOnFocus: false,
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

	return useSWR(url, fetcher, {
		revalidateOnFocus: false,
	});
};

export const fetchProductByHandle = (handle) => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/products/${handle}`;

	return useSWR(url, fetcher, {
		// fallbackData: { data: { product: null } },
		revalidateOnFocus: false,
		revalidateIfStale: false,
	});
};

export const fetchNewsBlogs = (cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/news-blog?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/blogs/news-blog?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { articles: [], pageInfo: { hasNextPage: false, endCursor: null } } },
		revalidateOnFocus: false,
	});
};

export const signUp = async (data) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/customers/register`,
			data,
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error.message;
	}
};

export const login = async (data) => {
	delete data.remember;
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/customers/login`,
			data,
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getCustomerDetails = async (accessToken) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/customers/get-customer-details`,
			{ accessToken },
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const createCart = async () => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/cart/create`,
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const customerCartIdUpdate = async (cartId, customerId) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/cart/customer-cart-id-update`,
			{ cartId, customerId },
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getCart = (cartId) => {
	if (!cartId) {
		return { data: null, error: null, isLoading: false };
	}

	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/cart/get-cart?cartId=${cartId}`;

	return useSWR(url, fetcher, {
		fallbackData: {},
	});
};

export const addToCart = async (data) => {
	try {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}/cart/add-to-cart`,
			data,
		);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

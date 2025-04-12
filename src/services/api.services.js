"use client";
import useSWR, { mutate } from "swr";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const fetcher = (url) => axios.get(url).then((res) => res.data);

const globalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VER}`;

export const fetchAllProducts = (cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${globalUrl}/products/get-all-products-with-paginate?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${globalUrl}/products/get-all-products-with-paginate?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, { revalidateOnFocus: false });
};

export const fetchHeaderMainMenu = () => {
	return useSWR(`${globalUrl}/menus/header-main-menu`, fetcher, {
		// fallbackData: { data: { menu: [] } },
		revalidateOnFocus: false,
	});
};
export const fetchHeaderCollection = () => {
	return useSWR(`${globalUrl}/menus/header-collection`, fetcher, {
		// fallbackData: { data: { menu: [] } },
		revalidateOnFocus: false,
	});
};

export const fetchHomePageMarketing = () => {
	return useSWR(`${globalUrl}/blogs/home-page-marketing`, fetcher, {
		// fallbackData: { data: [] },
		revalidateOnFocus: false,
	});
};

export const fetchHomePageBanner = () => {
	return useSWR(`${globalUrl}/blogs/home-page-banner`, fetcher, {
		// fallbackData: { data: [] },
		revalidateOnFocus: false,
		revalidateIfStale: false,
	});
};

export const fetchAllCollection = () => {
	return useSWR(`${globalUrl}/collections`, fetcher, {
		// fallbackData: { data: { collections: [] } },
		revalidateOnFocus: false,
	});
};

export const fetchBrandCategoriesCollection = () => {
	return useSWR(`${globalUrl}/collections/brand-categories`, fetcher, {
		// fallbackData: { data: { collections: [] } },
		revalidateOnFocus: false,
		revalidateIfStale: false,
	});
};

export const fetchProductCategoriesCollection = () => {
	return useSWR(`${globalUrl}/collections/product-categories`, fetcher, {
		// fallbackData: { data: { collections: [] } },
		revalidateOnFocus: false,
		revalidateIfStale: false,
	});
};

export const fetchHomeSliderCollections = () => {
	return useSWR(`${globalUrl}/collections/home-slider-collections`, fetcher, {
		fallbackData: { data: { collections: [] } },
		revalidateOnFocus: false,
	});
};

export const fetchCollectionByHandle = (handle, cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${globalUrl}/collections/${handle}?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${globalUrl}/collections/${handle}?sortKey=${sortKey}&reverse=${reverse}`;

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

	const url = `${globalUrl}/products/search?${params.toString()}`;

	return useSWR(url, fetcher, {
		revalidateOnFocus: false,
	});
};

export const fetchProductByHandle = (handle) => {
	const url = `${globalUrl}/products/${handle}`;

	return useSWR(url, fetcher, {
		// fallbackData: { data: { product: null } },
		revalidateOnFocus: false,
		revalidateIfStale: false,
	});
};

export const fetchNewsBlogs = (cursor = null, sortKey = "CREATED_AT", reverse = true) => {
	const url = cursor
		? `${globalUrl}/blogs/news-blog?cursor=${cursor}&sortKey=${sortKey}&reverse=${reverse}`
		: `${globalUrl}/blogs/news-blog?sortKey=${sortKey}&reverse=${reverse}`;

	return useSWR(url, fetcher, {
		fallbackData: { data: { articles: [], pageInfo: { hasNextPage: false, endCursor: null } } },
		revalidateOnFocus: false,
	});
};

export const fetchArticle = async (id) => {
	try {
		const res = await axios.post(`${globalUrl}/blogs/article`, { id });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const signUp = async (data) => {
	try {
		const res = await axios.post(`${globalUrl}/customers/register`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error.message;
	}
};

export const login = async (data) => {
	delete data.remember;
	try {
		const res = await axios.post(`${globalUrl}/customers/login`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getCustomerDetails = async (accessToken) => {
	try {
		const res = await axios.post(`${globalUrl}/customers/get-customer-details`, { accessToken });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const createCart = async () => {
	try {
		const res = await axios.post(`${globalUrl}/cart/create`);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const customerCartIdUpdate = async (cartId, customerId) => {
	try {
		const res = await axios.post(`${globalUrl}/cart/customer-cart-id-update`, { cartId, customerId });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const updateCustomer = async (data) => {
	try {
		const res = await axios.post(`${globalUrl}/customers/update-customer`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getCart = async (cartId) => {
	try {
		const res = await axios.get(`${globalUrl}/cart/get-cart?cartId=${cartId}`);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const addToCart = async (data) => {
	try {
		const res = await axios.post(`${globalUrl}/cart/add-to-cart`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const updateCartLine = async (data) => {
	try {
		const res = await axios.post(`${globalUrl}/cart/cart-line-update`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const removeFromCart = async (data) => {
	try {
		const res = await axios.post(`${globalUrl}/cart/remove-from-cart`, data);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const getCustomerOrders = async (customerId) => {
	try {
		const res = await axios.post(`${globalUrl}/customers/get-customer-orders`, { customerId });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};
export const getOrder = async (orderId) => {
	try {
		const res = await axios.get(`${globalUrl}/orders/${orderId}`);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};
export const createOrder = async (orderData) => {
	try {
		const res = await axios.post(`${globalUrl}/checkout/create-order`, orderData);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const createVNPayOrder = async (orderData) => {
	try {
		const res = await axios.post(`${globalUrl}/payment/create_payment_url`, orderData);
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const verifyVNPAYPayment = async (vnp_Params) => {
	try {
		const res = await axios.get(`${globalUrl}/payment/vnpay_ipn`, { params: vnp_Params });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const cancelOrderByCustomer = async (orderId, note) => {
	try {
		const res = await axios.post(`${globalUrl}/orders/cancel`, { orderId, note });
		return res.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

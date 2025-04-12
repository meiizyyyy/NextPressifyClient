"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { customerCartIdUpdate } from "@/services/api.services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("accessToken");
		const storedExpiresAt = localStorage.getItem("expiresAt");

		if (!storedToken) {
			const sessionToken = sessionStorage.getItem("accessToken");
			const sessionExpiresAt = sessionStorage.getItem("expiresAt");

			if (sessionToken && sessionExpiresAt) {
				setUser(JSON.parse(storedUser));
			}
		} else if (storedUser && storedToken && storedExpiresAt) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (customerDetails, accessToken, expiresAt, isRememberMe) => {
		const customer = customerDetails.customer.data.customer;
		setUser(customer);

		// Xử lý cartId
		if (customer.metafield?.key === "cartId") {
			// Nếu có cartId trong metafield, sử dụng nó
			localStorage.setItem("cartId", customer.metafield.value);
		} else if (localStorage.getItem("cartId")) {
			// Nếu không có cartId trong metafield, sử dụng cartId trong localStorage và thêm vào metafield
			customer.metafield = {
				key: "cartId",
				value: localStorage.getItem("cartId"),
			};

			customerCartIdUpdate(customer.metafield.value, customer.id);
		} else {
		}

		localStorage.setItem("user", JSON.stringify(customer));

		if (isRememberMe == false) {
			sessionStorage.setItem("accessToken", accessToken);
			sessionStorage.setItem("expiresAt", expiresAt);
		} else {
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("expiresAt", expiresAt);
		}

		router.push("/");
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("cartId");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("expiresAt");
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("expiresAt");
	};

	return <AuthContext.Provider value={{ user,setUser, login, logout, loading }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

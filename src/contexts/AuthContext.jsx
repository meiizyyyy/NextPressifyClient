"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("accessToken");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (userData, accessToken, expiresAt) => {
		setUser(userData.customer.data.customer);
		localStorage.setItem("user", JSON.stringify(userData.customer.data.customer));
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("tokenExpiresAt", expiresAt);
		router.push("/");
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("tokenExpiresAt");
	};

	return <AuthContext.Provider value={{ user, login, logout, loading }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Kiểm tra localStorage khi component mount
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("accessToken");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (userData) => {
		setUser(userData.customer);
		localStorage.setItem("user", JSON.stringify(userData.customer));
		localStorage.setItem("accessToken", userData.accessToken);
		localStorage.setItem("tokenExpiresAt", userData.expiresAt);
		router.push("/");
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("tokenExpiresAt");
		router.push("/sign-in");
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

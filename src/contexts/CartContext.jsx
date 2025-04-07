import { createContext, use, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCart } from "@/services/api.services";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const cartId = localStorage.getItem("cartId");

	const { data, error, isLoading, mutate } = getCart(cartId);

	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (data) {
			setCart(data?.data);
		}
	}, [data]);

	return (
		<CartContext.Provider value={{ cart, setCart, isLoading, error, refreshCart: mutate }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

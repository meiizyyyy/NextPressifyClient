import { createContext, use, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCart } from "@/services/api.services";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [cartId, setCartId] = useState(null);

	const handleGetCart = async (cartId) => {
		if (!cartId) {
			return;
		}
		const res = await getCart(cartId);
		if (res.data) {
			setCart(res.data);
		}
	};

	useEffect(() => {
		const savedCartId = localStorage.getItem("cartId");
		if (savedCartId) {
			setCartId(savedCartId);
		} else {
			setCartId(null);
			setCart([]);
		}
	}, []);

	useEffect(() => {
		handleGetCart(cartId);
	}, [cartId]);

	return (
		<CartContext.Provider value={{ cart, setCart, handleGetCart, cartId, setCartId }}>
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

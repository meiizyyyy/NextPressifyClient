import { createContext, use, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCart } from "@/services/api.services";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

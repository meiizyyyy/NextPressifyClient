"use client";

import React, { useEffect, useState } from "react";
import CartIcon from "./cart_icon";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import ProductCardOnCart from "./ProductCardOnCart";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CardDrawer = () => {
	const router = useRouter();

	const { cart, handleGetCart, cartId } = useCart();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			handleGetCart(cartId);
		}
	}, [isOpen]);

	const handleViewCart = () => {
		setIsOpen(false);
		router.push("/cart");
	};

	const handleCheckout = () => {
		setIsOpen(false);
		router.push("/checkout");
	};

	return (
		<div>
			<Button isIconOnly variant="light" onPress={() => setIsOpen(true)} className="w-fit " size="sm">
				<CartIcon />
			</Button>
			<Drawer isOpen={isOpen} size="2xl" radius="sm" onOpenChange={setIsOpen} shouldBlockScroll={false}>
				<DrawerContent>
					<DrawerHeader>
						<h3 className="text-lg font-bold">Giỏ Hàng</h3>
					</DrawerHeader>
					<DrawerBody className="overflow-y-auto flex flex-col justify-start ">
						{cart?.lines?.length === 0 || !cart?.lines ? (
							<h4 className="text-center">Hiện không có sản phẩm nào trong giỏ hàng</h4>
						) : (
							cart?.lines?.map((line) => <ProductCardOnCart key={line.id} item={line} />)
						)}
					</DrawerBody>
					<DrawerFooter className="flex flex-row justify-between">
						<h2 className="text-lg font-bold text-red-500">
							Tổng tiền:{" "}
							{new Intl.NumberFormat("vi-VN").format(parseInt(cart?.cost?.totalAmount?.amount))}
							{cart?.cost?.totalAmount.currencyCode}
						</h2>
						<div className="flex flex-row gap-2">
							<Button color="primary" variant="light" onPress={handleViewCart}>
								Xem chi tiết
							</Button>
							<Button color="primary" onPress={handleCheckout}>
								Đặt hàng
							</Button>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default CardDrawer;

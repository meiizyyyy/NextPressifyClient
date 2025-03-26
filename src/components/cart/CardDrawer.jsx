"use client";

import React, { useState } from "react";
import CartIcon from "./cart_icon";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import ProductCardOnCart from "./ProductCardOnCart";

const CardDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button isIconOnly variant="light" onPress={() => setIsOpen(true)} className="w-fit " size="sm">
				<CartIcon />
			</Button>
			<Drawer isOpen={isOpen} size="lg" onOpenChange={setIsOpen} shouldBlockScroll={false}>
				<DrawerContent>
					<DrawerHeader>
						<h3 className="text-lg font-bold">Giỏ Hàng</h3>
					</DrawerHeader>
					<DrawerBody>
						<h4>Hiện không có sản phẩm nào trong giỏ hàng</h4>
						<ProductCardOnCart />
						<ProductCardOnCart />
						<ProductCardOnCart />
						<ProductCardOnCart />
					</DrawerBody>
					<DrawerFooter>
						<Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
							Close
						</Button>
						<Button color="primary">Action</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default CardDrawer;

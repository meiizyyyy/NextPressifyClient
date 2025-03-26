"use client";

import React, { useState } from "react";
import CartIcon from "./cart_icon";
import { Button, Drawer, DrawerContent, DrawerHeader } from "@heroui/react";

const CardDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button isIconOnly variant="light" onPress={() => setIsOpen(true)} className="w-fit " size="sm">
				<CartIcon />
			</Button>
			<Drawer isOpen={isOpen} onOpenChange={setIsOpen} shouldBlockScroll={false}>
				<DrawerContent>
					<DrawerHeader>
						<h3 className="text-lg font-bold">Giỏ Hàng</h3>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default CardDrawer;

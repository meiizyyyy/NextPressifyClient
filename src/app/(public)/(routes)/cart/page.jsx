"use client";

import ProductCardOnCart from "@/components/cart/ProductCardOnCart";
import CollectionSlider from "@/components/home/CollectionSlider";
import { useCart } from "@/contexts/CartContext";
import { BreadcrumbItem, Breadcrumbs, Button, Divider } from "@heroui/react";
import Link from "next/link";
import React from "react";

const CartPage = () => {
	const { cart } = useCart();

	console.log("Check cart", cart);

	return (
		<div className="flex flex-col gap-10 w-full ">
			<div className="container mx-auto px-4 py-10">
				<Breadcrumbs className="mb-16">
					<BreadcrumbItem>
						<Link href="/">Trang chủ</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/cart`}>Giỏ hàng</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
				<h1 className="text-3xl font-bold mb-12">Giỏ hàng</h1>
				<div className="flex flex-col lg:flex-row gap-6 mb-36 lg:mb-20">
					{cart.totalQuantity === 0 || cart.length === 0 ? (
						<div className="flex flex-col gap-6 lg:w-4/6">
							<h4>Hiện không có sản phẩm nào trong giỏ hàng</h4>
							<Button
								className="w-full mt-4"
								color="primary"
								variant="flat"
								as={Link}
								href="/collections/all">
								Bắt đầu mua sắm
							</Button>
						</div>
					) : (
						<div className="flex flex-col gap-6 lg:w-4/6">
							{cart?.lines?.map((line) => (
								<ProductCardOnCart key={line.id} item={line} />
							))}
						</div>
					)}

					<div className="lg:w-2/6">
						<h2 className="text-lg font-bold mb-4">Thành tiền</h2>
						<div className="flex flex-col gap-4">
							<div className="flex justify-between">
								<span className="font-bold">Tạm tính</span>
								<span>
									{new Intl.NumberFormat("vi-VN").format(cart?.cost?.subtotalAmount?.amount)}{" "}
									{cart?.cost?.subtotalAmount?.currencyCode}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-bold">Phí vận chuyển</span>
								<span>
									{new Intl.NumberFormat("vi-VN").format(cart?.cost?.shippingAmount?.amount)}{" "}
									{cart?.cost?.shippingAmount?.currencyCode}
								</span>
							</div>{" "}
							<Divider />
							<div className="flex justify-between"></div>
							<div className="flex justify-between">
								<span className="font-bold">Tổng cộng</span>
								<span className="text-2xl font-bold text-danger-500">
									{new Intl.NumberFormat("vi-VN").format(cart?.cost?.totalAmount?.amount)}{" "}
									{cart?.cost?.totalAmount?.currencyCode}
								</span>
							</div>
							<Divider />
							<Button
								className="w-full mt-4"
								isDisabled={cart.length === 0}
								color="primary"
								variant="flat"
								as={Link}
								href="/checkout">
								Đặt hàng
							</Button>
						</div>
					</div>
				</div>

				<CollectionSlider handle="all" limit={10} additionalText="Có thể bạn sẽ thích" />
			</div>
		</div>
	);
};

export default CartPage;

"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Form,
	Input,
	Radio,
	RadioGroup,
	Textarea,
} from "@heroui/react";
import Link from "next/link";
import CollectionSlider from "@/components/home/CollectionSlider";
import { createOrder, createVNPayOrder } from "@/services/api.services";

const CheckoutPage = () => {
	const router = useRouter();
	const { cart, isLoading } = useCart();
	const { user } = useAuth();

	const [paymentMethod, setPaymentMethod] = useState("cod");

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData);

			console.log("cart info", cart);

			const orderData = {
				email: data.email || "",
				note: data.note,
				phone: data.phone,
				shippingAddress: {
					address1: data.address1,
					city: data.city,
					province: data.province,
					firstName: data.firstName,
					lastName: data.lastName || data.firstName,
					phone: data.phone,
				},
				lineItems: cart.lines.map((line) => ({
					variantId: line.merchandise.id,
					quantity: line.quantity,
					requiresShipping: true,
				})),
				totalPrice: cart.cost.totalAmount.amount,
				paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "VNPAY",
				financialStatus: "PENDING",
			};

			if (paymentMethod === "cod") {
				console.log("Thanh toán khi nhận hàng");
				console.log("orderData", orderData);
				const res = await createOrder(orderData);

				const orderId = res.data.id.split("/").pop();

				router.push(`/order-success?orderId=${orderId}`);
			} else {
				console.log("Thanh toán với VNPAY");
				console.log("orderData", orderData);
				const res = await createVNPayOrder(orderData);
				console.log("res", res);
				window.location.href = res.url;
			}
		} catch (error) {
			console.error("Lỗi khi đặt hàng:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (!cart || cart.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
				<button
					onClick={() => router.push("/products")}
					className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
					Tiếp tục mua sắm
				</button>
			</div>
		);
	}

	const total = cart.cost.totalAmount.amount;

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-16">
			<div>
				<Breadcrumbs className="mb-16">
					<BreadcrumbItem>
						<Link href="/">Trang chủ</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/cart`}>Giỏ hàng</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/checkout`}>Đặt hàng</Link>
					</BreadcrumbItem>
				</Breadcrumbs>
				<h1 className="text-3xl font-bold mb-8">Đặt hàng</h1>
				<div className="flex w-full flex-col lg:flex-row gap-8">
					<Card className=" p-6 lg:w-2/3" radius="sm">
						<CardHeader className="text-xl font-semibold mb-4">Thông tin giao hàng</CardHeader>
						<CardBody>
							<Form className="flex flex-col gap-5" validationBehavior="native" onSubmit={onSubmit}>
								<Input
									isRequired
									label="Họ và tên đệm"
									name="lastName"
									type="text"
									variant="underlined"
									defaultValue={user?.lastName || ""}
								/>
								<Input
									isRequired
									label="Tên"
									name="firstName"
									type="text"
									variant="underlined"
									defaultValue={user?.firstName || ""}
								/>
								<Input
									label="Email"
									name="email"
									type="email"
									variant="underlined"
									defaultValue={user?.email || ""}
								/>
								<Input
									isRequired
									label="Số điện thoại"
									name="phone"
									type="text"
									variant="underlined"
									defaultValue={user?.phone || ""}
								/>
								<p>Địa chỉ nhận hàng</p>
								<div className="flex gap-3 w-full">
									<Input isRequired label="Thành phố" name="city" type="text" variant="underlined" />
									<Input
										isRequired
										label="Quận/ Huyện"
										name="province"
										type="text"
										variant="underlined"
									/>
									<Input
										isRequired
										label="Tên đường/ Số nhà/ Tòa nhà"
										name="address1"
										type="text"
										variant="underlined"
									/>
								</div>

								<Textarea disableAutosize label="Ghi chú" name="note" variant="underlined" />

								<p>Phương thức thanh toán</p>
								<RadioGroup name="paymentMethod" value={paymentMethod} onValueChange={setPaymentMethod}>
									<Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
									<Radio value="vnpay">Thanh toán với VNPAY</Radio>
								</RadioGroup>

								<Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
									{paymentMethod === "cod" ? "Đặt hàng" : "Đi đến trang Thanh Toán"}
								</Button>
							</Form>
						</CardBody>
					</Card>

					<Card className=" p-6 lg:w-1/3" radius="sm">
						<CardHeader className="text-xl font-semibold mb-4">Tổng quan đơn hàng</CardHeader>
						<CardBody className="space-y-4">
							{cart.lines.map((item) => (
								<div key={item.id} className="flex items-center justify-between">
									<div>
										<p className="font-medium">{item.merchandise.product.title}</p>
										<p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
									</div>
									<p className="font-medium text-red-500">
										{new Intl.NumberFormat("vi-VN").format(item.cost.totalAmount.amount)}
										{item.cost.totalAmount.currencyCode}
									</p>
								</div>
							))}
						</CardBody>
						<Divider />
						<CardFooter className="flex justify-between items-center">
							<p className="font-semibold">Tổng cộng:</p>
							<p className="text-xl font-bold text-danger-500">
								{new Intl.NumberFormat("vi-VN").format(total)}đ
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>

			<CollectionSlider handle="all" limit={10} additionalText="Có thể bạn sẽ thích" />
		</div>
	);
};

export default CheckoutPage;

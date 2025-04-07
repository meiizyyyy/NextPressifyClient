"use client";

import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip, Divider, Image } from "@heroui/react";
import Link from "next/link";
import React from "react";

const OrderDetailsPage = ({ params }) => {
	// Mock data - sẽ được thay thế bằng API call
	const order = {
		id: 16144221053178,
		createdAt: "2025-03-28",
		totalAmount: "75,980,000 VND",
		status: "Đã xác nhận",
		statusColor: "success",
		customer: {
			name: "Đặng Hoàng Đức",
			phone: "+84123456789",
			email: "example@email.com",
		},
		shippingAddress: {
			address: "123ABC, Nguyễn Thái Học",
			district: "Sơn Tây",
			city: "Hà Nội",
		},
		paymentMethod: "Thanh toán khi nhận hàng (COD)",
		items: [
			{
				name: "Laptop gaming ASUS ROG Strix G16 G614JV N4156W",
				quantity: 2,
				price: "37,990,000 VND",
				image: "https://cdn.shopify.com/s/files/1/0737/8753/9706/files/ava_4be5b44424da406995bb6393899770c7_grande_34cf649c-f513-4f5e-9c2c-a24c8e2c3952.png?v=1742524396",
			},
		],
		timeline: [
			{
				date: "2024-03-20 14:30",
				status: "Đặt hàng thành công",
				description: "Đơn hàng đã được đặt và đang chờ xác nhận",
			},
			{
				date: "2024-03-20 15:00",
				status: "Đã xác nhận",
				description: "Đơn hàng đã được xác nhận và đang được xử lý",
			},
		],
	};

	return (
		<div className="flex flex-col gap-10 w-full">
			<div className="container mx-auto px-4 py-10">
				<Breadcrumbs className="mb-10">
					<BreadcrumbItem>
						<Link href="/">Trang chủ</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href="/orders">Đơn hàng của tôi</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/orders/${order.id}`}>Chi tiết đơn hàng</Link>
					</BreadcrumbItem>
				</Breadcrumbs>

				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-10">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-bold">Chi tiết đơn hàng #{order.id}</h1>
							<Chip color={order.statusColor} variant="flat" size="lg">
								{order.status}
							</Chip>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Thông tin đơn hàng */}
						<div className="lg:col-span-2">
							<Card className="w-full p-6">
								<CardHeader>
									<h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-6">
										<div className="flex flex-col gap-2">
											<h3 className="font-medium">Sản phẩm</h3>
											<div className="flex flex-col gap-4">
												{order.items.map((item, index) => (
													<div key={index} className="flex gap-4">
														<div className="w-20 h-20 bg-gray-100 rounded-lg">
															{/* Image sẽ được thêm sau */}
															<Image
																src={item.image}
																alt={item.name}
																width={100}
																height={100}
															/>
														</div>
														<div className="flex-1">
															<p className="font-medium">{item.name}</p>
															<p className="text-sm text-gray-500">
																Số lượng: {item.quantity}
															</p>
															<p className="text-sm font-medium">{item.price}</p>
														</div>
													</div>
												))}
											</div>
										</div>

										<Divider />

										<div className="flex flex-col gap-2">
											<h3 className="font-medium">Thông tin thanh toán</h3>
											<div className="flex flex-col gap-1 text-sm">
												<div className="flex justify-between">
													<span>Tạm tính</span>
													<span>{order.totalAmount}</span>
												</div>
												<div className="flex justify-between">
													<span>Phí vận chuyển</span>
													<span>Miễn phí</span>
												</div>
												<Divider />
												<div className="flex justify-between font-medium">
													<span>Tổng cộng</span>
													<span>{order.totalAmount}</span>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>

						{/* Thông tin giao hàng và khách hàng */}
						<div className="flex flex-col gap-6">
							<Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Thông tin giao hàng</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-2 text-sm">
										<p className="font-medium">{order.customer.name}</p>
										<p>{order.customer.phone}</p>
										<p>{order.customer.email}</p>
										<h2 className="text-xl font-semibold">Địa chỉ giao hàng</h2>
										<p className="mt-2">{order.shippingAddress.address}</p>
										<p>
											{order.shippingAddress.district}, {order.shippingAddress.city}
										</p>
									</div>
								</CardBody>
							</Card>

							<Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Phương thức thanh toán</h2>
								</CardHeader>
								<CardBody>
									<p className="text-sm">{order.paymentMethod}</p>
								</CardBody>
							</Card>

							{/* <Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Lịch sử đơn hàng</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-4">
										{order.timeline.map((event, index) => (
											<div key={index} className="flex gap-4">
												<div className="flex flex-col items-center">
													<div className="w-2 h-2 rounded-full bg-primary"></div>
													{index < order.timeline.length - 1 && (
														<div className="w-0.5 h-8 bg-gray-200"></div>
													)}
												</div>
												<div>
													<p className="font-medium">{event.status}</p>
													<p className="text-sm text-gray-500">{event.description}</p>
													<p className="text-xs text-gray-400">
														{new Date(event.date).toLocaleString("vi-VN")}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardBody>
							</Card> */}
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<Button as={Link} href="/orders" variant="flat" color="danger">
							Hủy đơn hàng
						</Button>
						<Button as={Link} href="/orders" variant="bordered">
							Quay lại
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailsPage;

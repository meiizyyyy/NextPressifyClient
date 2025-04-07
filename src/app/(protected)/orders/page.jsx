"use client";

import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import Link from "next/link";
import React from "react";

const OrdersPage = () => {
	// Mock data - sẽ được thay thế bằng API call
	const orders = [
		{
			id: "16144221053178",
			createdAt: "2025-03-28",
			totalAmount: "75,980,000 VND",
			status: "Đã xác nhận",
			statusColor: "success",
			items: [
				{
					name: "Laptop gaming ASUS ROG Strix G16 G614JV N4156W",
					quantity: 2,
					price: "37,990,000 VND",
				},
			],
		},
	];

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
				</Breadcrumbs>

				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-10">
						<h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
					</div>

					<div className="flex flex-col gap-6 ">
						{orders.map((order) => (
							<Card key={order.id} className="w-full p-6">
								<CardHeader className="flex flex-row justify-between items-center">
									<div className="flex flex-col gap-1">
										<h2 className="text-xl font-semibold">Đơn hàng #{order.id}</h2>
										<p className="text-sm text-gray-500">
											Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
										</p>
									</div>
									<Chip color={order.statusColor} variant="flat">
										{order.status}
									</Chip>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<h3 className="font-medium">Sản phẩm</h3>
											<div className="flex flex-col gap-2">
												{order.items.map((item, index) => (
													<div key={index} className="flex justify-between text-sm">
														<span>
															{item.name} x {item.quantity}
														</span>
														<span>{item.price}</span>
													</div>
												))}
											</div>
										</div>
										<div className="flex justify-between items-center pt-4 border-t">
											<span className="font-medium">Tổng tiền</span>
											<span className="font-semibold">{order.totalAmount}</span>
										</div>
										<div className="flex justify-end gap-2">
											<Button as={Link} href={`/orders/${order.id}`} variant="bordered">
												Chi tiết
											</Button>
										</div>
									</div>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;

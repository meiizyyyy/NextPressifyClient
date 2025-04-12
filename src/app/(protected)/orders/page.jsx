"use client";

import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { unauthorized, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerOrders } from "@/services/api.services";

const OrdersPage = () => {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			unauthorized();
		}
	}, [user, router]);

	if (!user) {
		unauthorized();
	}

	const handleGetCustomerOrders = async () => {
		try {
			const res = await getCustomerOrders(user.id);
			console.log(res.data.customerOrders);
			setOrders(res?.data?.customerOrders);
		} catch (error) {
			console.error("Lỗi khi lấy đơn hàng:", error);
		} finally {
			setLoading(false);
		}
	};

	const getOrderStatus = (order) => {
		const statuses = [];

		// Kiểm tra trạng thái thanh toán
		if (order.fullyPaid === true) {
			statuses.push({ text: "Đã thanh toán", color: "success" });
		} else if (order.transactions?.[0]?.gateway === "Cash on Delivery") {
			statuses.push({ text: "Thanh toán khi nhận hàng", color: "warning" });
		} else {
			statuses.push({ text: "Chưa thanh toán", color: "warning" });
		}

		// Kiểm tra trạng thái giao hàng
		if (order.fulfillments?.[0]?.status === "SUCCESS" && order.fulfillments?.[0].name) {
			statuses.push({ text: "Đã gửi hàng", color: "success" });
		} else {
			statuses.push({ text: "Đang chờ gửi hàng", color: "warning" });
		}

		// Kiểm tra trạng thái hủy
		if (order.cancelledAt) {
			statuses.push({ text: "Đơn hàng đã bị hủy", color: "danger" });
		}

		// Kiểm tra trạng thái xác nhận
		if (order.confirmed) {
			statuses.push({ text: "Đã xác nhận", color: "success" });
		} else {
			statuses.push({ text: "Chờ xác nhận", color: "warning" });
		}

		return statuses;
	};

	useEffect(() => {
		handleGetCustomerOrders();
	}, []);

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
						<h1 className="text-3xl font-bold">Danh sách đơn hàng</h1>
					</div>

					{loading ? (
						<div className="flex justify-center items-center min-h-[200px]">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
						</div>
					) : orders?.length > 0 ? (
						<div className="flex flex-col gap-6">
							{orders.map((order) => (
								<Card
									key={order.id}
									className="w-full p-6 hover:shadow-lg transition-all duration-300"
									radius="sm"
									shadow="sm">
									<CardHeader className="flex flex-row justify-between items-center">
										<div className="flex flex-col gap-1">
											<h2 className="text-xl font-semibold">
												Đơn hàng #{order.id.split("/").pop()}
											</h2>
											<p className="text-sm text-gray-500">
												Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
											</p>
											<p className="text-sm text-gray-500">Số đơn hàng: {order.name}</p>
										</div>
										<div className="flex flex-col gap-2">
											{order?.cancelledAt && order?.cancelledAt !== null ? (
												<Chip color="danger" variant="flat" size="lg">
													Đơn hàng đã bị hủy
												</Chip>
											) : (
												getOrderStatus(order).map((status, index) => (
													<Chip key={index} color={status.color} variant="flat">
														{status.text}
													</Chip>
												))
											)}
										</div>
									</CardHeader>
									<CardBody>
										<div className="flex flex-col gap-4">
											<div className="flex flex-col gap-2">
												<h3 className="text-lg font-semibold">Sản phẩm</h3>
												<div className="flex flex-col gap-4">
													{order.lineItems?.map((item) => (
														<div
															key={item.id}
															className="flex justify-between text-sm w-full">
															<span className="w-1/2">{item.name}</span>
															<span className="w-1/2 flex justify-end">
																{item.quantity} x
																<span className="font-semibold ml-2 ">
																	{new Intl.NumberFormat("vi-VN").format(
																		item.originalTotalSet.shopMoney.amount,
																	)}
																	{item.originalTotalSet.shopMoney.currencyCode}
																</span>
															</span>
														</div>
													))}
												</div>
											</div>
											<div className="flex justify-between items-center pt-4 border-t">
												<span className="font-medium">Tổng tiền</span>
												<span className="font-semibold text-red-600">
													{new Intl.NumberFormat("vi-VN").format(
														order.totalPriceSet.shopMoney.amount,
													)}
													{order.totalPriceSet.shopMoney.currencyCode}
												</span>
											</div>
											<div className="flex justify-end gap-2">
												<Button
													as={Link}
													href={`/orders/${order.id.split("/").pop()}`}
													variant="bordered">
													Chi tiết
												</Button>
											</div>
										</div>
									</CardBody>
								</Card>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-4 py-10">
							<p className="text-lg text-gray-500">Bạn chưa có đơn hàng nào</p>
							<Button as={Link} href="/" color="primary">
								Tiếp tục mua sắm
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;

"use client";

import Link from "next/link";
import {
	addToast,
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Form,
	Input,
	Select,
	SelectItem,
} from "@heroui/react";
import React, { useState } from "react";
import { getOrder } from "@/services/api.services";

const formatDate = (isoDateStr) => {
	return new Date(isoDateStr).toLocaleString("vi-VN", {
		timeZone: "Asia/Ho_Chi_Minh",
		hour12: false,
	});
};

const TrackOrdersPage = () => {
	const [orderData, setOrderData] = useState(null);

	const getOrderStatus = (order) => {
		const statuses = [];

		// Kiểm tra trạng thái thanh toán
		if (order.fullyPaid === true) {
			statuses.push({ text: "Đã thanh toán", color: "text-green-600" });
		} else if (order.transactions?.[0]?.gateway === "Cash on Delivery") {
			statuses.push({ text: "Thanh toán khi nhận hàng", color: "text-yellow-600" });
		} else {
			statuses.push({ text: "Chưa thanh toán", color: "text-yellow-600" });
		}

		// Kiểm tra trạng thái giao hàng
		if (order.fulfillments?.[0]?.status === "SUCCESS" && order.fulfillments?.[0].name) {
			statuses.push({ text: "Đã gửi hàng", color: "text-green-600" });
		} else {
			statuses.push({ text: "Đang chờ gửi hàng", color: "text-yellow-600" });
		}

		// Kiểm tra trạng thái hủy
		if (order.cancelledAt) {
			statuses.push({ text: "Đơn hàng đã bị hủy", color: "text-red-600" });
		}

		// Kiểm tra trạng thái xác nhận
		if (order.confirmed) {
			statuses.push({ text: "Đã xác nhận", color: "text-green-600" });
		} else {
			statuses.push({ text: "Chờ xác nhận", color: "text-yellow-600" });
		}

		return statuses;
	};

	const handleTrackOrder = async (e) => {
		e.preventDefault();
		console.log("clicked");
		try {
			const formData = new FormData(e.currentTarget);
			const data = Object.fromEntries(formData);

			const orderId = data.orderId;
			const res = await getOrder(orderId);

			if (res.success === true && res.order) {
				setOrderData(res.order);

				console.log(res.order);
			}
		} catch (error) {
			addToast({
				title: "Tìm kiếm đơn hàng thất bại",
				description: error.error || "Có lỗi xảy ra trong quá trình đăng nhập",
				color: "danger",
			});
		}
	};
	return (
		<div className="container mx-auto px-4 py-10">
			<Breadcrumbs className="mb-20">
				<BreadcrumbItem>
					<Link href="/">Trang chủ</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link href="/pages/track-orders">Tra cứu đơn hàng</Link>
				</BreadcrumbItem>
			</Breadcrumbs>

			<div className="flex flex-col gap-10">
				<div>
					<div className="flex flex-col gap-10">
						<h1 className="text-3xl font-bold mb-8">Nhập mã đơn hàng</h1>
					</div>

					<Form className="flex flex-col gap-10 items-center justify-start" onSubmit={handleTrackOrder}>
						<Input required label="Mã đơn hàng" placeholder="Mã đơn hàng" className="" name="orderId" />
						<Button type="submit" className="">
							Tra cứu
						</Button>
					</Form>
				</div>

				{orderData ? (
					<div>
						<h1 className="text-3xl font-bold mb-8">Kết quả tìm kiếm</h1>
						<Card className="w-full p-6" shadow="sm" radius="sm">
							<CardHeader className="flex flex-col gap-1">
								<h2 className="text-xl font-semibold">Thông tin đơn hàng {orderData?.name}</h2>
								<p className="text-md text-gray-500">Mã đơn hàng: {orderData?.id.split("/").pop()}</p>
							</CardHeader>
							<CardBody>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
									<div className="flex flex-col gap-10">
										<div className="flex flex-col gap-2">
											<h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
											<div className="flex flex-col gap-3 text-md">
												<p>
													<span className="font-semibold">Tên người nhận:</span>{" "}
													{orderData.shippingAddress?.name}
												</p>
												<p>
													<span className="font-semibold">Số điện thoại:</span>{" "}
													{orderData.shippingAddress?.phone}
												</p>
												<p>
													<span className="font-semibold">Email:</span> {orderData?.email}
												</p>
												<p>
													<span className="font-semibold">Địa chỉ giao hàng: </span>{" "}
													{orderData.shippingAddress?.address1} -
													{orderData.shippingAddress?.province} -
													{orderData.shippingAddress?.city}
												</p>
											</div>
										</div>
										<div className="flex flex-col gap-2">
											<h3 className="text-lg font-semibold">Trạng thái đơn hàng</h3>
											<div className="flex flex-col gap-1 text-md">
												<p>Phương thức thanh toán: {orderData.transactions?.[0]?.gateway}</p>
												{getOrderStatus(orderData).map((status, index) => (
													<p key={index} className={status.color}>
														{status.text}
													</p>
												))}
												<p>Thời gian đặt hàng: {formatDate(orderData.createdAt)}</p>
											</div>
										</div>
									</div>

									<div className="flex flex-col gap-6">
										<h2 className="text-lg font-semibold">Tổng quan đơn hàng</h2>
										<div className="flex flex-col gap-2">
											{orderData.lineItems?.map((item) => (
												<div key={item.id} className="flex flex-col gap-2">
													<p>{item.name}</p>
													<div className="flex flex-row gap-2 justify-end">
														<p>{item.quantity}</p> x
														<p className="font-semibold text-red-500">
															{new Intl.NumberFormat("vi-VN").format(
																item.originalTotalSet.shopMoney.amount,
															)}
															{item.originalTotalSet.shopMoney.currencyCode}
														</p>
													</div>
												</div>
											))}
										</div>
										<Divider />
										<div className="flex flex-row gap-2 justify-end">
											<p className="text-lg font-semibold">Tổng tiền:</p>
											<p className="text-xl font-semibold text-red-600">
												{new Intl.NumberFormat("vi-VN").format(
													orderData.totalPriceSet?.shopMoney?.amount,
												)}
												{orderData.totalPriceSet?.shopMoney?.currencyCode}
											</p>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default TrackOrdersPage;

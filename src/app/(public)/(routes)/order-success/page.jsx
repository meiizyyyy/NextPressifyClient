"use client";

import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";

const OrderSuccessPage = () => {
	return (
		<div className="flex flex-col gap-10 w-full">
			<div className="container mx-auto px-4 py-10">
				<Breadcrumbs className="mb-10">
					<BreadcrumbItem>
						<Link href="/">Trang chủ</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href="/order-success">Đặt hàng</Link>
					</BreadcrumbItem>
				</Breadcrumbs>

				<div className="flex flex-col items-center">
					<svg
						className="text-green-500"
						xmlns="http://www.w3.org/2000/svg"
						width={200}
						height={120}
						viewBox="0 0 24 24">
						<path
							fill="none"
							stroke="currentColor"
							strokeDasharray={24}
							strokeDashoffset={24}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 11l6 6l10 -10">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"></animate>
						</path>
					</svg>
					<h1 className="text-3xl font-bold text-center ">Đặt hàng thành công</h1>
					<p className="text-center text-md text-gray-500 mt-2">
						Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
					</p>
				</div>

				<Card className="w-full p-6" shadow="sm" radius="sm">
					<CardHeader className="flex flex-col gap-1">
						<h2 className="text-xl font-semibold">Thông tin đơn hàng {orderData.name}</h2>
						<p className="text-md text-gray-500">Mã đơn hàng: {orderId}</p>
					</CardHeader>
					<CardBody>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
							<div className="flex flex-col gap-10">
								<div className="flex flex-col gap-2">
									<h2 className="text-lg font-semibold">Thông tin giao hàng</h2>
									<div className="flex flex-col gap-3 text-md">
										<p>
											<span className="font-semibold">Tên người nhận:</span>{" "}
											{orderData.shippingAddress.name}
										</p>
										<p>
											<span className="font-semibold">Số điện thoại:</span>{" "}
											{orderData.shippingAddress.phone}
										</p>
										<p>
											<span className="font-semibold">Email:</span> {orderData?.email}
										</p>
										<p>
											<span className="font-semibold">Địa chỉ giao hàng: </span>{" "}
											{orderData.shippingAddress.address1} -{orderData.shippingAddress.province} -
											{orderData.shippingAddress.city}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-lg font-semibold">Trạng thái đơn hàng</h3>
									<div className="flex flex-col gap-1 text-md">
										<p>Phương thức thanh toán: {orderData.transactions[0].gateway}</p>
										{orderData.fullyPaid === true ? (
											<p className="text-green-600">Đã thanh toán</p>
										) : (
											<p className="text-red-600">Đã xác nhận</p>
										)}
										<p>Thời gian đặt hàng: {formatDate(orderData.createdAt)}</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-6">
								<h2 className="text-lg font-semibold">Tổng quan đơn hàng</h2>
								<div className="flex flex-col gap-2">
									{orderData.lineItems.map((item) => (
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
											orderData.totalPriceSet.shopMoney.amount,
										)}
										{orderData.totalPriceSet.shopMoney.currencyCode}
									</p>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
				<div className="">
					Cần hỗ trợ về đơn hàng? Liên hệ với chúng tôi{" "}
					<Link href="/contact" className="text-blue-500">
						tại đây
					</Link>
				</div>
				<div className="flex gap-4">
					<Button as={Link} href="/pages/track-orders" variant="bordered">
						Tra cứu đơn hàng
					</Button>
					<Button as={Link} href="/" color="primary">
						Tiếp tục mua sắm
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccessPage;

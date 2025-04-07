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

				<div className="flex flex-col gap-10">
					<div className="flex flex-col  items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width={200} height={150} viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								strokeDasharray={24}
								strokeDashoffset={24}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 11l6 6l10 -10">
								<animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									dur="0.4s"
									values="24;0"></animate>
							</path>
						</svg>
						<h1 className="text-3xl font-bold  text-center">Đặt hàng thành công</h1>
						<p className="text-center text-md text-gray-500">
							Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
						</p>
					</div>

					<Card className="w-full p-6">
						<CardHeader className="flex flex-col gap-1">
							<h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
							<p className="text-sm text-gray-500">Mã đơn hàng: 16144221053178</p>
						</CardHeader>
						<CardBody>
							<div className="grid grid-cols-2 gap-6">
								<div className="flex flex-col gap-2">
									<h3 className="font-medium">Thông tin khách hàng</h3>
									<div className="flex flex-col gap-1 text-sm">
										<p>Họ tên: Đặng Hoàng Đức</p>
										<p>Số điện thoại: +84888123456</p>
										<p>Email: example@email.com</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-medium">Địa chỉ giao hàng</h3>
									<div className="flex flex-col gap-1 text-sm">
										<p>123ABC Nguyễn Thái Học Thị xã Sơn Tây, TP.Hà Nội</p>
										<p></p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-medium">Phương thức thanh toán</h3>
									<div className="flex flex-col gap-1 text-sm">
										<p>Thanh toán khi nhận hàng (COD)</p>
										<p>Tổng tiền: 1.500.000đ</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-medium">Trạng thái đơn hàng</h3>
									<div className="flex flex-col gap-1 text-sm">
										<p className="text-green-600">Đã xác nhận</p>
										<p>Ngày đặt: 20/03/2024</p>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>

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
		</div>
	);
};

export default OrderSuccessPage;

"use client";

import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs, Button, Form, Input, Select, SelectItem } from "@heroui/react";
import React from "react";

const TrackOrdersPage = () => {
	return (
		<div className="flex flex-col gap-10 w-full">
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
					<div className="flex flex-col gap-10">
						<h1 className="text-3xl font-bold mb-8">Nhập mã đơn hàng</h1>
					</div>

					<Form className="flex flex-row gap-10 items-center ">
						<Input label="Mã đơn hàng" placeholder="Mã đơn hàng" className="w-4/5 h-full" />
						<Select
							isRequired
							className="max-w-xs"
							defaultSelectedKeys={["COD"]}
							label="Loại đơn hàng"
							placeholder="Chọn loại đơn hàng">
							<SelectItem key="COD">Thanh toán khi nhận hàng (COD)</SelectItem>
							<SelectItem key="vnpay">Thanh toán với VNPAY</SelectItem>
						</Select>
					</Form>
					<Button type="primary" className="w-1/5">
						Tra cứu
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TrackOrdersPage;

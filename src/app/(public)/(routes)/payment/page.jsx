"use client";

import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import React from "react";

const PaymentVerifyPage = () => {
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
					<BreadcrumbItem>
						<Link href="/payment">Thanh toán</Link>
					</BreadcrumbItem>
				</Breadcrumbs>

				<div className="flex flex-col gap-10 items-center">
					<Spinner />
					<p className="text-lg font-bold">Chúng tôi đang xử lý đơn hàng của bạn, vui lòng chờ trong giây lát.</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentVerifyPage;

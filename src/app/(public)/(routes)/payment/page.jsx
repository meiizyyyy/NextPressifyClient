"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { verifyVNPAYPayment } from "@/services/api.services";

const PaymentVerifyPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [status, setStatus] = useState("loading");
	const [error, setError] = useState(null);

	const vnp_Params = Object.fromEntries(searchParams.entries());

	const handleVerifyPayment = async () => {
		try {
			const response = await verifyVNPAYPayment(vnp_Params);

			console.log(response);
			setStatus("success");
		} catch (error) {
			setStatus("failed");
			setError(error.message || "Có lỗi xảy ra khi xác thực thanh toán");
		}
	};

	useEffect(() => {
		handleVerifyPayment();
	}, []);

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
					{status === "loading" && (
						<>
							<Spinner />
							<p className="text-lg font-bold">
								Chúng tôi đang xử lý đơn hàng của bạn, vui lòng chờ trong giây lát.
							</p>
						</>
					)}

					{status === "success" && (
						<>
							<div className="text-green-500 text-6xl">✓</div>
							<p className="text-lg font-bold text-green-500">Thanh toán thành công!</p>
							<p className="text-gray-600">Bạn sẽ được chuyển hướng đến trang xác nhận đơn hàng...</p>
						</>
					)}

					{status === "failed" && (
						<>
							<div className="text-red-500 text-6xl">✕</div>
							<p className="text-lg font-bold text-red-500">Thanh toán thất bại</p>
							<p className="text-gray-600">{error}</p>
							<Button color="primary" onPress={() => router.push("/checkout")}>
								Quay lại trang thanh toán
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentVerifyPage;

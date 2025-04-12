"use client";

import { cancelOrderByCustomer, getOrder } from "@/services/api.services";
import {
	addToast,
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Divider,
	Form,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const cancelReasonOptions = [
	{ value: "Đặt nhầm sản phẩm", label: "Đặt nhầm sản phẩm" },
	{ value: "Thay đổi quyết định", label: "Thay đổi quyết định" },
	{ value: "Không còn nhu cầu", label: "Không còn nhu cầu" },
	{ value: "Thông tin giao hàng sai", label: "Thông tin giao hàng sai" },
	{ value: "Lý do khác", label: "Lý do khác" },
];

const OrderDetailsPage = ({ params }) => {
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [isLoading, setIsLoading] = useState(false);

	const getOrderStatus = (order) => {
		const statuses = [];
		// Kiểm tra trạng thái hủy
		if (order?.cancelledAt) {
			statuses.push({
				text: `Đơn hàng đã bị hủy bởi ${order?.cancelReason === "CUSTOMER" ? "Khách Hàng" : ""} 
                Lý do: ${order?.cancellation?.staffNote}`,
				color: "text-red-600",
			});
		}
		// Kiểm tra trạng thái giao hàng
		if (order?.fulfillments?.[0]?.status === "SUCCESS" && order?.fulfillments?.[0].name) {
			statuses.push({ text: "Đã gửi hàng", color: "text-green-600" });
		} else {
			statuses.push({ text: "Đang chờ gửi hàng", color: "text-yellow-600" });
		}

		// Kiểm tra trạng thái xác nhận
		if (order?.confirmed) {
			statuses.push({ text: "Đã xác nhận", color: "text-green-600" });
		} else {
			statuses.push({ text: "Chờ xác nhận", color: "text-yellow-600" });
		}

		return statuses;
	};

	const handleGetOrder = async () => {
		setIsLoading(true);
		try {
			const response = await getOrder(orderId);

			if (response.success && response.order) {
				setOrder(response.order);
			}
		} catch (error) {
			addToast({
				title: "Lỗi",
				description: "Có lỗi xảy ra trong quá trình lấy thông tin đơn hàng",
				variant: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancelOrder = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);

		try {
			const response = await cancelOrderByCustomer(orderId, data.note);

			if (response.success && response.order?.orderCancel?.job.id) {
				handleGetOrder();
				addToast({
					title: "Thành công",
					description: "Đơn hàng đã được hủy thành công",
					color: "success",
				});
			} else if (response.success && response.order?.orderCancel?.orderCancelUserErrors.code === "INVALID") {
				addToast({
					title: "Lỗi",
					description: "Đơn hàng đã được hủy trước đó" || response.order?.orderCancel?.userErrors[0]?.message,
					color: "danger",
				});
			}
		} catch (error) {
			addToast({
				title: "Lỗi",
				description: "Có lỗi xảy ra trong quá trình hủy đơn hàng",
				color: "danger",
			});
		} finally {
			setIsLoading(false);
			onOpenChange();
		}
	};

	useEffect(() => {
		handleGetOrder();
	}, [orderId]);

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
						<Link href={`/orders/${order?.id}`}>Chi tiết đơn hàng</Link>
					</BreadcrumbItem>
				</Breadcrumbs>

				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-10">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-bold">Chi tiết đơn hàng #{order?.id.split("/").pop()}</h1>
							<Chip color="default" variant="flat" size="lg">
								{new Date(order?.createdAt).toLocaleString("vi-VN", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Chip>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
												{order?.lineItems?.map((item, index) => (
													<div key={index} className="flex gap-4">
														<div className="w-fit h-fit bg-gray-100 rounded-lg">
															{/* Image sẽ được thêm sau */}
															<Image src={item.image.url} alt={item.name} height={100} />
														</div>
														<div className="flex-1">
															<p className="font-medium">{item.name}</p>
															<p className="text-sm text-gray-500">
																Số lượng: {item.quantity}
															</p>
															<p className="text-md font-medium text-red-500">
																{new Intl.NumberFormat("vi-VN").format(
																	item.originalTotalSet.shopMoney.amount,
																)}
																{item.originalTotalSet.shopMoney.currencyCode}
															</p>
														</div>
													</div>
												))}
											</div>
										</div>

										<Divider />

										<div className="flex flex-col gap-2">
											<h3 className="font-medium">Thông tin thanh toán</h3>
											<div className="flex flex-col gap-5 text-sm">
												<div className="flex justify-between">
													<span>Tạm tính</span>
													<span className="text-red-500">
														{new Intl.NumberFormat("vi-VN").format(
															order?.totalPriceSet.shopMoney.amount,
														)}
														{order?.totalPriceSet.shopMoney.currencyCode}
													</span>
												</div>
												<div className="flex justify-between">
													<span>Phí vận chuyển</span>
													<span>Miễn phí</span>
												</div>
												<Divider />
												<div className="flex justify-between font-medium">
													<span>Tổng cộng</span>
													<span className="text-red-500 text-lg font-medium">
														{new Intl.NumberFormat("vi-VN").format(
															order?.totalPriceSet.shopMoney.amount,
														)}
														{order?.totalPriceSet.shopMoney.currencyCode}
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>

						<div className="flex flex-col gap-6">
							<Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Thông tin giao hàng</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-4 text-md ">
										<p className="">
											<span className="font-medium mr-1">Tên người nhận:</span>
											{order?.shippingAddress?.name}
										</p>
										<p className="">
											<span className="font-medium mr-1">Số điện thoại:</span>
											{order?.phone}
										</p>
										<p className="">
											<span className="font-medium mr-1">Email:</span>
											{order?.email}
										</p>
										<h2 className="text-xl font-semibold">Địa chỉ giao hàng</h2>
										<p className="mt-2">{order?.shippingAddress?.address1}</p>
										<p>
											{order?.shippingAddress?.province}, {order?.shippingAddress?.city}
										</p>
									</div>
								</CardBody>
							</Card>

							<Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Phương thức thanh toán</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-4">
										<div className="flex items-center gap-2">
											<span className="font-medium">Phương thức:</span>
											<span>{order?.tags[0]}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="font-medium">Trạng thái:</span>
											{order?.fullyPaid ? (
												<Chip color="success" variant="flat">
													Đã thanh toán
												</Chip>
											) : order?.transactions?.[0]?.gateway === "Cash on Delivery" ? (
												<Chip color="warning" variant="flat">
													Thanh toán khi nhận hàng
												</Chip>
											) : (
												<Chip color="warning" variant="flat">
													Chưa thanh toán
												</Chip>
											)}
										</div>
										{order?.transactions?.length > 0 && (
											<div className="flex flex-col gap-2">
												<span className="font-medium">Lịch sử giao dịch:</span>
												<div className="flex flex-col gap-3">
													{order.transactions.map((transaction, index) => (
														<div
															key={index}
															className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
															<div className="flex justify-between">
																<span className="font-medium">
																	Giao dịch #{index + 1}
																</span>
																<span className="text-sm text-gray-500">
																	{new Date(transaction.processedAt).toLocaleString(
																		"vi-VN",
																	)}
																</span>
															</div>
															<div className="flex justify-between">
																<span>Số tiền:</span>
																<span className="font-medium text-red-500">
																	{new Intl.NumberFormat("vi-VN").format(
																		transaction.amountSet.shopMoney.amount,
																	)}
																	{transaction.amountSet.shopMoney.currencyCode}
																</span>
															</div>
															<div className="flex justify-between">
																<span>Trạng thái:</span>
																<Chip
																	color={
																		transaction.status === "SUCCESS"
																			? "success"
																			: "warning"
																	}
																	variant="flat"
																	size="sm">
																	{transaction.status === "SUCCESS"
																		? "Thành công"
																		: "Đang xử lý"}
																</Chip>
															</div>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</CardBody>
							</Card>

							<Card>
								<CardHeader>
									<h2 className="text-xl font-semibold">Lịch sử đơn hàng</h2>
								</CardHeader>
								<CardBody>
									<div className="flex flex-col gap-4">
										{getOrderStatus(order).map((status, index) => (
											<p key={index} className={status.color}>
												{status.text}
											</p>
										))}
									</div>
								</CardBody>
							</Card>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						{order?.fulfillments?.[0]?.status !== "SUCCESS" && order?.fullyPaid === false && (
							<Button onPress={onOpen} variant="flat" color="danger">
								Hủy đơn hàng
							</Button>
						)}
						<Button as={Link} href="/orders" variant="bordered">
							Quay lại
						</Button>
					</div>
				</div>
			</div>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
				<ModalContent>
					{(onClose) => {
						return (
							<Form onSubmit={handleCancelOrder}>
								<ModalHeader className="flex flex-col gap-1">Hủy đơn hàng</ModalHeader>
								<ModalBody className="flex flex-col gap-4 w-full">
									<p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>

									<Select
										isRequired
										name="note"
										items={cancelReasonOptions}
										label="Lý do hủy đơn hàng"
										placeholder="Chọn lý do hủy đơn hàng">
										{(reason) => <SelectItem key={reason.value}>{reason.label}</SelectItem>}
									</Select>
								</ModalBody>
								<ModalFooter className="w-full">
									<Button color="primary" variant="light" onPress={onClose}>
										Quay lại
									</Button>
									<Button color="danger" type="submit">
										Hủy đơn hàng
									</Button>
								</ModalFooter>
							</Form>
						);
					}}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default OrderDetailsPage;

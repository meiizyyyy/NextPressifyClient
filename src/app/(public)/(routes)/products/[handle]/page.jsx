"use client";

import { addToCart, createCart, fetchProductByHandle, customerCartIdUpdate } from "@/services/api.services";
import {
	addToast,
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Card,
	CardBody,
	Chip,
	Image,
	Skeleton,
	Tab,
	Tabs,
} from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CollectionSlider from "@/components/home/CollectionSlider";
import { useAuth } from "@/contexts/AuthContext";
import LatestNews from "@/components/home/LatestNews";
import { useCart } from "@/contexts/CartContext";

const ProductDetailPage = () => {
	const { handle } = useParams();
	const { data, error, isLoading } = fetchProductByHandle(handle);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const { cartId, setCartId } = useCart();
	const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
	const { user } = useAuth();

	const handleQuantityChange = (change) => {
		const newQuantity = Math.max(1, Math.min(maxQuantity, quantity + change));
		setQuantity(newQuantity);
	};

	const handleQuantityInput = (e) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
			const newQuantity = Math.max(1, Math.min(maxQuantity, value));
			setQuantity(newQuantity);
		}
	};

	useEffect(() => {
		const storedCartId = localStorage.getItem("cartId");
		if (storedCartId) {
			setCartId(storedCartId);
		}
	}, []);

	// Xử lý khi thêm vào giỏ hàng
	const handleAddToCart = async () => {
		try {
			setIsAddToCartLoading(true);
			let currentCartId = cartId;

			if (!currentCartId) {
				const createCartRes = await createCart();
				if (!createCartRes.cart.id) {
					addToast({
						title: "Tạo mới giỏ hàng",
						description: "Có lỗi xảy ra khi tạo giỏ hàng",
						color: "danger",
					});
					return;
				}

				currentCartId = createCartRes.cart.id;
				setCartId(currentCartId);
				localStorage.setItem("cartId", currentCartId);

				if (user) {
					await customerCartIdUpdate({
						customerId: user.id,
						key: "cartId",
						value: currentCartId,
					});
				}

				addToast({
					title: "Tạo mới giỏ hàng",
					description: "Tạo mới giỏ hàng thành công",
					color: "success",
				});
			}

			// Đảm bảo có cartId trước khi thêm vào giỏ hàng
			if (!currentCartId) {
				throw new Error("Không tìm thấy ID giỏ hàng");
			}

			const addToCartRes = await addToCart({
				cartId: currentCartId,
				variantId: variantId,
				quantity: quantity,
			});

			if (addToCartRes.data.success === true) {
				addToast({
					title: "Thêm vào giỏ hàng",
					description: `Đã thêm ${quantity} ${product.title} vào giỏ hàng`,
					color: "success",
				});
			} else {
				addToast({
					title: "Thêm vào giỏ hàng",
					description: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
					color: "danger",
				});
			}
		} catch (error) {
			addToast({
				title: "Lỗi",
				description: error.message || "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
				color: "danger",
			});
		} finally {
			setIsAddToCartLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-14">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-1/2">
						<Skeleton className="h-[500px] rounded-lg" />
					</div>
					<div className="lg:w-1/2">
						<Skeleton className="h-12 w-3/4 mb-4" />
						<Skeleton className="h-6 w-1/2 mb-2" />
						<Skeleton className="h-10 w-1/3 mb-8" />
						<Skeleton className="h-28 w-full mb-6" />
						<Skeleton className="h-12 w-full mb-4" />
						<Skeleton className="h-12 w-full" />
					</div>
				</div>
				<div className="mt-12">
					<Skeleton className="h-8 w-1/4 mb-4" />
					<Skeleton className="h-40 w-full" />
				</div>
			</div>
		);
	}

	if (error || !data?.data?.product) {
		return (
			<div className="container mx-auto px-4 py-14">
				<Card shadow="none">
					<CardBody>
						<p className="text-center text-xl">Không tìm thấy sản phẩm hoặc có lỗi xảy ra</p>
					</CardBody>
				</Card>
			</div>
		);
	}

	const product = data.data.product;
	const maxQuantity = product.totalInventory;
	const variantId = product.variants.edges[0].node.id;

	const price = product.priceRangeV2.maxVariantPrice.amount
		? new Intl.NumberFormat("vi-VN").format(parseInt(product.priceRangeV2.maxVariantPrice.amount))
		: "";
	const comparePrice = product.compareAtPriceRange?.maxVariantCompareAtPrice?.amount
		? new Intl.NumberFormat("vi-VN").format(parseInt(product.compareAtPriceRange.maxVariantCompareAtPrice.amount))
		: "";
	const discount = product.compareAtPriceRange?.maxVariantCompareAtPrice?.amount
		? Math.round(
				((parseInt(product.compareAtPriceRange.maxVariantCompareAtPrice.amount) -
					parseInt(product.priceRangeV2.maxVariantPrice.amount)) /
					parseInt(product.compareAtPriceRange.maxVariantCompareAtPrice.amount)) *
					100,
		  )
		: 0;

	return (
		<div className="flex flex-col gap-10 w-full">
			<div className="container mx-auto px-4 py-10">
				<Breadcrumbs className="mb-16">
					<BreadcrumbItem>
						<Link href="/">Trang chủ</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href="/collections/all">Sản Phẩm</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/products/${product.handle}`}>{product.title}</Link>
					</BreadcrumbItem>
				</Breadcrumbs>

				<div className="flex flex-col lg:flex-row gap-8 mb-12">
					<div className="lg:w-1/2">
						<div className="relative">
							<Image
								alt={product.title}
								className="object-contain w-full h-[500px]"
								src={
									product.media?.edges?.[selectedImageIndex]?.node?.preview?.image?.url ||
									"/placeholder-image.jpg"
								}
							/>
						</div>

						{product.media?.edges?.length > 1 && (
							<div className="grid grid-cols-5 gap-2 mt-4">
								{product.media.edges.map((media, index) => (
									<div
										key={media.node.id}
										className={`cursor-pointer border-2 ${
											selectedImageIndex === index ? "border-primary" : "border-transparent"
										}`}
										onClick={() => setSelectedImageIndex(index)}>
										<Image
											alt={`${product.title} -  ${index + 1}`}
											className="object-cover h-20 w-full"
											src={media.node.preview.image.url}
										/>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="lg:w-1/2">
						<h1 className="text-3xl font-bold mb-2">{product.title}</h1>
						<p className="text-sm text-gray-600 mb-4">{product.vendor}</p>

						<div className="flex items-center gap-4 mb-6">
							<span className="text-3xl font-bold text-red-600">
								{price} {product.priceRangeV2.maxVariantPrice.currencyCode || "VND"}
							</span>
							{comparePrice && (
								<>
									<span className="text-gray-500 text-xl line-through">
										{comparePrice}
										{product.compareAtPriceRange.maxVariantCompareAtPrice.currencyCode || "VND"}
									</span>
									<Chip color="danger" size="sm">
										-{discount}%
									</Chip>
								</>
							)}
						</div>

						<div className="mb-6">
							<h3 className="text-lg font-semibold mb-2">Số lượng</h3>

							<div className="flex items-center">
								<Button
									size="sm"
									variant="flat"
									onPress={() => handleQuantityChange(-1)}
									isDisabled={quantity <= 1}>
									-
								</Button>
								<input
									type="number"
									min="1"
									value={quantity}
									onChange={handleQuantityInput}
									className="mx-4 w-20 text-center border rounded px-2 py-1"
								/>
								<Button
									size="sm"
									variant="flat"
									onPress={() => handleQuantityChange(1)}
									isDisabled={quantity > product.totalInventory + 1}>
									+
								</Button>
								<span className="ml-4 text-sm text-red-400">
									{quantity === maxQuantity && `Đã đạt số lượng tối đa cho phép`}
								</span>
							</div>
						</div>

						<Button
							color="danger"
							size="lg"
							className="w-full mb-6"
							isLoading={isAddToCartLoading}
							spinner={
								<svg
									className="animate-spin h-5 w-5 text-current"
									fill="none"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										fill="currentColor"
									/>
								</svg>
							}
							isDisabled={
								quantity > product.totalInventory + 1 || isAddToCartLoading || maxQuantity === 0
							}
							onPress={handleAddToCart}>
							{maxQuantity === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
						</Button>

						{product.tags && product.tags.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-2">Tags</h3>
								<div className="flex flex-wrap gap-2">
									{product.tags.map((tag) => (
										<Chip key={tag} variant="flat" radius="sm" size="sm">
											{tag}
										</Chip>
									))}
								</div>
							</div>
						)}

						{product.productType && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-2">Loại sản phẩm</h3>
								<Chip
									as={Link}
									href={`/collections/${product.productType}`}
									variant="flat"
									radius="sm"
									size="sm">
									{product.productType}
								</Chip>
							</div>
						)}

						{product.collections?.nodes && product.collections.nodes.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-2">Danh mục</h3>
								<div className="flex flex-wrap gap-2">
									{product.collections.nodes.map((collection, index) => (
										<Chip
											as={Link}
											href={`/collections/${collection.title}`}
											key={index}
											variant="flat"
											radius="sm"
											size="sm">
											{collection.title}
										</Chip>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="mt-12">
					<Tabs
						selectedKey={activeTab}
						onSelectionChange={setActiveTab}
						variant="bordered"
						aria-label="Product Details"
						classNames={{
							tab: "text-lg font-semibold",
							tabList: "gap-12",
							cursor: "w-full bg-primary ",
							panel: "pt-4",
						}}>
						<Tab key="description" title="Mô tả sản phẩm">
							<Card shadow="none">
								<CardBody>
									{product.descriptionHtml ? (
										<div
											className="prose max-w-none"
											dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
										/>
									) : (
										<p>Hiện chưa có mô tả sản phẩm</p>
									)}
								</CardBody>
							</Card>
						</Tab>
						<Tab key="specifications" title="Thông số kỹ thuật">
							<Card shadow="none">
								<CardBody>
									<table className="w-full">
										<tbody>
											{product.metafields?.edges?.map((edge) => (
												<tr key={edge.node.key} className="border-b">
													<td className="py-5 font-medium">{edge?.node?.definition?.name}</td>
													<td className="py-5">{edge?.node?.jsonValue}</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</div>
			</div>

			<CollectionSlider handle={product.vendor} limit={10} additionalText={`Sản phẩm cùng thương hiệu`} />
			<LatestNews />
		</div>
	);
};

export default ProductDetailPage;

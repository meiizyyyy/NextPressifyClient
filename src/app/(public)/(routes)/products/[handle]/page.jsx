"use client";

import { fetchProductByHandle } from "@/services/api.services";
import { Button, Card, CardBody, Chip, Image, Skeleton, Tab, Tabs } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ProductDetailPage = () => {
	const { handle } = useParams();
	const { data, error, isLoading } = fetchProductByHandle(handle);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	// Xử lý khi thay đổi số lượng
	const handleQuantityChange = (change) => {
		const newQuantity = Math.max(1, quantity + change);
		setQuantity(newQuantity);
	};

	// Xử lý khi thêm vào giỏ hàng
	const handleAddToCart = () => {
		// Thêm logic thêm vào giỏ hàng ở đây
		console.log(`Đã thêm ${quantity} ${product.title} vào giỏ hàng`);
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
		<div className="container mx-auto px-4 py-14">
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
										alt={`${product.title} - Ảnh ${index + 1}`}
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
						<span className="text-2xl font-bold">
							{price} {product.priceRangeV2.maxVariantPrice.currencyCode || "VND"}
						</span>
						{comparePrice && (
							<>
								<span className="text-gray-500 line-through">
									{comparePrice}{" "}
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
							<span className="mx-4 min-w-[40px] text-center">{quantity}</span>
							<Button size="sm" variant="flat" onPress={() => handleQuantityChange(1)}>
								+
							</Button>
						</div>
					</div>

					<Button color="primary" size="lg" className="w-full mb-6" onPress={handleAddToCart}>
						Thêm vào giỏ hàng
					</Button>

					{product.tags && product.tags.length > 0 && (
						<div className="mb-6">
							<h3 className="text-lg font-semibold mb-2">Tags</h3>
							<div className="flex flex-wrap gap-2">
								{product.tags.map((tag) => (
									<Chip key={tag} variant="flat" size="sm">
										{tag}
									</Chip>
								))}
							</div>
						</div>
					)}

					{product.productType && (
						<div className="mb-6">
							<h3 className="text-lg font-semibold mb-2">Loại sản phẩm</h3>
							<Chip as={Link} href={`/collections/${product.productType}`} variant="flat" size="sm">
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
					aria-label="Product Details"
					classNames={{
						tab: "text-lg font-semibold",
						tabList: "gap-12",
						cursor: "w-full bg-primary",
						panel: "pt-4",
					}}>
					<Tab key="description" title="Mô tả sản phẩm">
						<Card shadow="none">
							<CardBody>
								<div
									className="prose max-w-none"
									dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
								/>
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
												<td className="py-2 font-medium">{edge.node.definition.name}</td>
												<td className="py-2">{edge.node.jsonValue}</td>
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
	);
};

export default ProductDetailPage;

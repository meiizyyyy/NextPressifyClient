import React from "react";
import { Card, CardHeader, CardBody, Image, CardFooter, Button, Badge, Chip, Divider } from "@heroui/react";
import Link from "next/link";

const ProductCard = ({ product, isLoading }) => {
	const { title, vendor, priceRangeV2, images, compareAtPriceRange, createdAt, handle } = product;
	const price = parseInt(priceRangeV2.maxVariantPrice.amount);
	const comparePrice = parseInt(compareAtPriceRange?.maxVariantCompareAtPrice.amount);
	const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
	const formattedComparePrice = new Intl.NumberFormat("vi-VN").format(comparePrice);

	return (
		<Link
			href={`/products/${handle}`}
			className="hover:shadow-xl hover:scale-105 transition-all duration-250 h-11/12">
			<Card className="pt-4 h-full flex flex-col justify-between" shadow="none" radius="none">
				{Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
					<Badge color="danger" className="absolute top-2 right-8 z-20" content="New"></Badge>
				)}
				<Image
					radius="md"
					// height={250}
					alt="Card background"
					className="object-scale-down w-full min-h-72 scale-75"
					src={images[0].preview.image.url}
					width="100%"
					classNames={{ wrapper: "!max-w-full" }}
				/>

				<CardBody className=" overflow-visible min-h-48 max-h-48 lg:max-h-60 py-2">
					<small>{vendor} </small>
					<h4 className="font-bold min-h-20 max-h-20 text-lg line-clamp-4 mb-4">{title}</h4>
				</CardBody>

				<CardFooter className="flex flex-col justify-end items-start text-end">
					{compareAtPriceRange ? (
						<div className="flex items-center gap-2">
							<small className="line-through">
								{formattedComparePrice} {priceRangeV2.maxVariantPrice.currencyCode}
							</small>

							{comparePrice > 0 && price < comparePrice && (
								<Chip className="text-red-500 font-semibold" radius="sm" variant="light">
									- {Math.round(((comparePrice - price) / comparePrice) * 100)}%
								</Chip>
							)}
						</div>
					) : (
						<div className="w-2 h-7"></div>
					)}{" "}
					<h4 className="text-base lg:text-xl font-bold text-red-600">
						{formattedPrice} {priceRangeV2.maxVariantPrice.currencyCode}
					</h4>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductCard;

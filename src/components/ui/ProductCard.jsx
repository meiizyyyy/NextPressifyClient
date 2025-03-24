import React from "react";
import { Card, CardHeader, CardBody, Image, CardFooter, Button, Badge, Chip, Divider } from "@heroui/react";
import Link from "next/link";

const ProductCard = ({ product, isLoading }) => {
	const { title, vendor, priceRangeV2, images, compareAtPriceRange, createdAt } = product;
	const price = parseInt(priceRangeV2.maxVariantPrice.amount);
	const comparePrice = parseInt(compareAtPriceRange?.maxVariantCompareAtPrice.amount);
	const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
	const formattedComparePrice = new Intl.NumberFormat("vi-VN").format(comparePrice);

	return (
		<Link href={"/"} className="hover:shadow-xl hover:scale-105 transition-all duration-250 h-11/12">
			<Card className="pt-4 h-full flex flex-col justify-between" shadow="none" radius="none">
				<Image
					radius="md"
					// height={250}
					alt="Card background"
					className="object-cover min-h-72 max-h-72"
					src={images[0].preview.image.url}
					width="100%"
				/>
				
				<CardBody className=" overflow-visible min-h-52 max-h-52 lg:max-h-64 py-2">
					{Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
						<Badge color="danger" className="absolute top-2 right-4 z-20" content="New"></Badge>
					)}
					<small>{vendor} </small>
					<h4 className="font-bold min-h-20 max-h-20 text-lg line-clamp-4 mb-4">{title}</h4>
					<Divider />
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
				</CardBody>

				<CardFooter className="flex flex-col justify-end items-start text-end"></CardFooter>
			</Card>
		</Link>
	);
};

export default ProductCard;

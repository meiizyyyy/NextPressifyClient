import React from "react";
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@heroui/react";
import Link from "next/link";

const ProductCard = ({ product, isLoading }) => {
	const { title, vendor, priceRangeV2, images } = product;
	const price = parseInt(priceRangeV2.maxVariantPrice.amount);
	const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
	return (
		<Link href={"/"} className="hover:shadow-xl hover:scale-105 transition-all duration-250">
			<Card className="pt-4 h-full flex flex-col justify-between " isFooterBlurred radius="none">
				<CardBody className=" overflow-visible min-h-64 lg:min-h-64 max-h-64 py-2">
					<Image
						radius="md"
						// height={250}
						alt="Card background"
						className="object-cover max-h-64 lg:max-h-56 "
						src={images[0].preview.image.url}
						width="100%"
					/>
				</CardBody>

				<CardBody>
					<small>{vendor} </small>
					<h4 className="font-bold text-lg line-clamp-4">{title}</h4>
				</CardBody>

				{/* <CardHeader className="pb-5 pt-5 px-4 flex-col items-start justify-start max-h-44">
					<h4 className="font-bold text-large">{title}</h4>
					<p className="text-tiny uppercase font-bold">Daily Mix</p>
					<small className="text-default-500">{vendor}</small>
				</CardHeader> */}
				<CardFooter>
					<h4 className="text-base lg:text-xl font-bold text-red-600">
						{formattedPrice} {priceRangeV2.maxVariantPrice.currencyCode}
					</h4>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductCard;

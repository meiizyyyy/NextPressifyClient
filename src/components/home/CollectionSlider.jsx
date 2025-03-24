import React from "react";
import ProductSlider from "../ui/ProductSlider";
import { fetchCollectionByHandle } from "@/services/api.services";
import { Button, Card, Image, Link } from "@heroui/react";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const CollectionSlider = ({ handle = "laptop", limit }) => {
	const { data, error, isLoading } = fetchCollectionByHandle(handle);
	const collection = data?.data;
	const productsData = data?.data?.productsList;
	console.log("check data collection slider", productsData);

	if (isLoading) return <ProductCardSkeleton />;

	return (
		<Card radius="none">
			<div className="flex flex-col w-full  ">
				<div className="flex flex-col px-5 pt-5">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold mb-4"> {collection.title}</h2>{" "}
						{/* {collection.image.url && (
							<Image
								src={collection.image.url}
								className="w-full h-28 object-cover "
								classNames={{ wrapper: "!max-w-full" }}
							/>
						)} */}
						<Button as={Link} href={collection.path} variant="light">
							Xem tất cả
						</Button>
					</div>
				</div>

				<ProductSlider products={productsData || []} limit={limit} />
			</div>
		</Card>
	);
};

export default CollectionSlider;

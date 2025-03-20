"use client";

import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchCollectionByHandle } from "@/services/api.services";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { useParams } from "next/navigation";
import React from "react";

const CollectionPage = () => {
	const { collectionName } = useParams();

	const { data, error, isLoading } = fetchCollectionByHandle(collectionName);

	console.log(data.data?.productsList);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8 w-full">
				<Skeleton className="h-8 w-64 mb-6 rounded-lg" />
				<div className="grid grid-cols-4 sm:grid-cols-6 gap-8">
					{[...Array(8)].map((_, index) => (
						<div key={index} className="flex flex-col items-center gap-4">
							<Skeleton className="h-48 w-full rounded-lg" />
							<Skeleton className="h-6 w-32" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className=" py-14">
			<Card radius="sm" shadow="none">
				<CardBody>
					<p className="text-start text-3xl mb-9">Collection: {data.data?.title}</p>
				</CardBody>
			</Card>

			<div className="grid grid-cols-2 gap-6 grid-rows-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{data.data?.productsList.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default CollectionPage;

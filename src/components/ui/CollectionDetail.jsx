"use client";

import React from "react";
import { Skeleton } from "@heroui/react";
import { fetchCollectionByHandle } from "@/services/api.services";
import ProductGrid from "./ProductGrid";

const CollectionDetail = ({ handle }) => {
	const { data, error, isLoading } = fetchCollectionByHandle(handle);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center gap-6">
					<Skeleton className="h-64 w-full max-w-4xl rounded-lg" />
					<Skeleton className="h-8 w-96" />
					<Skeleton className="h-4 w-3/4 max-w-2xl" />
				</div>
				<div className="mt-12">
					<Skeleton className="h-8 w-48 mb-6" />
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{[...Array(8)].map((_, index) => (
							<div key={index} className="flex flex-col gap-4">
								<Skeleton className="h-48 w-full rounded-lg" />
								<Skeleton className="h-6 w-32" />
								<Skeleton className="h-4 w-24" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error) return <div>Error: {error.message}</div>;

	const collection = data?.data;

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Collection Header */}
			<div className="flex flex-col items-center gap-6 mb-12">
				{collection?.image && (
					<img
						src={collection.image.url}
						alt={collection.title}
						className="h-64 w-full max-w-4xl object-cover rounded-lg"
					/>
				)}
				<h1 className="text-3xl font-bold">{collection?.title}</h1>
				{collection?.description && (
					<p className="text-gray-600 text-center max-w-2xl">{collection.description}</p>
				)}
			</div>

			{/* Products Grid */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold mb-6">Sản Phẩm</h2>
				<ProductGrid products={collection?.products} />
			</div>
		</div>
	);
};

export default CollectionDetail;

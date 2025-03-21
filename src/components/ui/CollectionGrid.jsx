"use client";

import React from "react";
import CollectionSmallItem from "./CollectionSmallItem";
import { Skeleton } from "@heroui/react";

const CollectionGrid = ({ heading, fetchData }) => {
	const { data, error, isLoading } = fetchData();

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

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold mb-6">{heading}</h2>
			<div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
				{data?.data?.collections?.map((collection) => (
					<CollectionSmallItem
						key={collection.handle}
						title={collection.title}
						description={collection.description}
						image={collection.image}
						path={collection.path}
					/>
				))}
			</div>
		</div>
	);
};

export default CollectionGrid;

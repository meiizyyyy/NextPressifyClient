import React from "react";
import { fetchHomeSliderCollections } from "@/services/api.services";
import CollectionSlider from "./CollectionSlider";
import { Skeleton } from "@heroui/react";

const HomePageSliders = () => {
	const { data, error, isLoading } = fetchHomeSliderCollections();

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-8 w-64 rounded-lg mb-4" />
				<Skeleton className="h-72 w-full rounded-lg" />
			</div>
		);
	}

	const collections = data?.data?.collections || [];

	if (collections.length === 0) {
		return null;
	}

	return (
		<div className="space-y-5">
			{collections.map((collection) => (
				<CollectionSlider key={collection.handle} handle={collection.handle}  />
			))}
		</div>
	);
};

export default HomePageSliders;

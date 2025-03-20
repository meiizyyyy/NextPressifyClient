"use client";

import CollectionGrid from "@/components/ui/CollectionGrid";
import React from "react";
import { fetchBrandCategoriesCollection, fetchProductCategoriesCollection } from "@/services/api.services";

const Collections = () => {
	return (
		<div className="w-full flex flex-col gap-10 my-10">
			<CollectionGrid heading="Danh Mục Theo Thương Hiệu" fetchData={fetchBrandCategoriesCollection} />
			<CollectionGrid heading="Danh Mục Theo Loại Sản Phẩm" fetchData={fetchProductCategoriesCollection} />
		</div>
	);
};

export default Collections;

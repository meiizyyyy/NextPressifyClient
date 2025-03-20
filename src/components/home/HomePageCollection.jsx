import React from "react";
import CollectionGrid from "../ui/CollectionGrid";
import { fetchBrandCategoriesCollection, fetchProductCategoriesCollection } from "@/services/api.services";
const HomePageCollection = () => {
	return (
		<div>
			<CollectionGrid heading="Danh Mục Theo Loại Sản Phẩm" fetchData={fetchProductCategoriesCollection} />
		</div>
	);
};

export default HomePageCollection;

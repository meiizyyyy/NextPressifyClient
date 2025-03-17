"use client";

import CollectionsGrid from "@/components/home/collectionsGrid";
import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchAllProducts } from "@/services/api.services";
import { Card, CardBody } from "@heroui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const App = () => {
	const [cursor, setCursor] = useState(null);
	const [ProductList, setProductList] = useState([]);

	const { data, error, isLoading } = fetchAllProducts(cursor);

	useEffect(() => {
		setProductList([]);
	},[]);

	useEffect(() => {
		if (data?.data?.productsList) {
			setProductList((prev) => [...prev, ...data.data.productsList]);
		}
	}, [data]);

	const nextPageCursor = data?.data?.pageInfo?.endCursor;
	console.log("products list :", ProductList);

	const handleLoadMore = useCallback(() => {
		if (nextPageCursor) {
			setCursor(nextPageCursor);
		}
	}, [nextPageCursor]);

	return (
		<div className="h-[10000px] flex flex-col gap-5">
			<CollectionsGrid />
			<div className="grid grid-cols-2 gap-6 grid-rows-2 lg:grid-cols-4  xl:grid-cols-5">
				{ProductList.map((product, index) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
			{nextPageCursor && (
				<button onClick={handleLoadMore} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
					Load More
				</button>
			)}
			<Card radius="sm" shadow="none">
				<CardBody>
					<p>Make beautiful websites regardless of your design experience.</p>
				</CardBody>
			</Card>
		</div>
	);
};

export default App;

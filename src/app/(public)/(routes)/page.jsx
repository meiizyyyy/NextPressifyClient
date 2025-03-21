"use client";

import BannerSlider from "@/components/home/BannerSlider";
import CollectionsGrid from "@/components/home/collectionsGrid";
import CollectionSlider from "@/components/home/CollectionSlider";
import HomePageCollection from "@/components/home/HomePageCollection";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchAllProducts } from "@/services/api.services";
import { Button, Card, CardBody, Divider, Link, Skeleton } from "@heroui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const App = () => {
	const [cursor, setCursor] = useState(null);
	const [ProductList, setProductList] = useState([]);

	const { data, error, isLoading } = fetchAllProducts(cursor);

	useEffect(() => {
		setProductList([]);
	}, []);

	useEffect(() => {
		if (data?.data?.productsList) {
			setProductList((prev) => [...prev, ...data.data.productsList]);
		}
	}, [data]);

	// const nextPageCursor = data?.data?.pageInfo?.endCursor;
	// console.log("products list :", ProductList);

	// const handleLoadMore = useCallback(() => {
	// 	if (nextPageCursor) {
	// 		setCursor(nextPageCursor);
	// 	}
	// }, [nextPageCursor]);

	return (
		<>
			<BannerSlider />
			<div className="h-[10000px] flex flex-col gap-5 min-w-full">
				<CollectionsGrid />

				{isLoading ? (
					<ProductCardSkeleton />
				) : (
					<>
						<div className="flex justify-between">
							<p className="text-2xl font-bold">Sản phẩm mới nhất của chúng tôi.</p>

							<Button as={Link} href="/collections/all" variant="light">
								Xem tất cả
							</Button>
						</div>
						<div className="grid grid-cols-2 gap-6 grid-rows-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
							{ProductList.slice(0, 10).map((product, index) => {
								return <ProductCard key={product.id} product={product} isLoading={isLoading} />;
							})}
						</div>
						{/* {nextPageCursor && (
							<Button onPress={handleLoadMore} className="text-black px-4 py-2 rounded mt-4">
								Load More
							</Button>
						)} */}
					</>
				)}
				<Divider />
				<HomePageCollection />

				<CollectionSlider handle="asus" limit={10} />
				<CollectionSlider handle="lenovo" />
				<CollectionSlider handle="laptop-gaming-duoi-30-trieu" limit={10} />
			</div>
		</>
	);
};

export default App;

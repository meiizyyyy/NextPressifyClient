"use client";

import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchCollectionByHandle, fetchAllProducts } from "@/services/api.services";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { useParams } from "next/navigation";
import * as React from "react";

const CollectionPage = ({ params }) => {
	const { collectionName } = React.use(params);
	const [products, setProducts] = React.useState([]);
	const [cursor, setCursor] = React.useState(null);
	const [hasNextPage, setHasNextPage] = React.useState(true);
	const [isLoadingMore, setIsLoadingMore] = React.useState(false);
	const loaderRef = React.useRef(null);

	const { data, error, isLoading } =
		collectionName.toLowerCase() === "all"
			? fetchAllProducts(cursor)
			: fetchCollectionByHandle(collectionName, cursor);

	React.useEffect(() => {
		if (data?.data?.productsList && !isLoading) {
			if (cursor) {
				setProducts((prev) => [...prev, ...data.data.productsList]);
			} else {
				setProducts(data.data.productsList);
			}
			setHasNextPage(data.data?.pageInfo?.hasNextPage || false);
			setIsLoadingMore(false);
		}
	}, [data, isLoading, cursor]);

	const loadMoreProducts = React.useCallback(() => {
		if (hasNextPage && !isLoadingMore && data?.data?.pageInfo?.endCursor) {
			setIsLoadingMore(true);
			setCursor(data.data.pageInfo.endCursor);
		}
	}, [hasNextPage, isLoadingMore, data]);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target.isIntersecting && hasNextPage && !isLoadingMore) {
					loadMoreProducts();
				}
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			},
		);

		const currentLoaderRef = loaderRef.current;
		if (currentLoaderRef) {
			observer.observe(currentLoaderRef);
		}

		return () => {
			if (currentLoaderRef) {
				observer.unobserve(currentLoaderRef);
			}
		};
	}, [hasNextPage, isLoadingMore, loadMoreProducts]);

	if (isLoading && !cursor) {
		return (
			<div className="container mx-auto px-4 py-14 w-full ">
				<Skeleton className="h-8 w-64 mb-9 rounded-lg" />
				<div className="grid grid-cols-4 sm:grid-cols-5 gap-8">
					{[...Array(10)].map((_, index) => (
						<div key={index} className="flex flex-col items-center gap-4">
							<Skeleton className="h-72 w-full rounded-lg" />
							<Skeleton className="h-6 w-32" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="py-14">
			<Card radius="sm" shadow="none">
				<CardBody>
					{data?.data?.title ? (
						<p className="text-start text-3xl mb-9">Collection: {data?.data?.title}</p>
					) : (
						<p className="text-start text-3xl mb-9">Tất cả sản phẩm</p>
					)}
				</CardBody>
			</Card>

			<div className="grid grid-cols-2 gap-6 grid-rows-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{products.map((product, index) => (
					<ProductCard product={product} key={`${product.id}+${index}`} />
				))}
			</div>

			{isLoadingMore && (
				<div className="mt-8 flex justify-center items-center py-4">
					<div className="w-10 h-10 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
				</div>
			)}

			<div ref={loaderRef} className="h-20 mt-4"></div>
		</div>
	);
};

export default CollectionPage;

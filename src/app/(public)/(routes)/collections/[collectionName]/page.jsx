"use client";

import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchCollectionByHandle, fetchAllProducts } from "@/services/api.services";
import { Card, CardBody, Radio, RadioGroup, Select, SelectItem, Skeleton } from "@heroui/react";
import { useParams } from "next/navigation";
import * as React from "react";

export const filterOptions = [
	{
		label: "Mới nhất",
		key: "CREATED_AT",
		reverse: true,
		sortKey: "CREATED_AT",
	},
	{
		label: "Cũ nhất",
		key: "CREATED_AT_DESC",
		reverse: false,
		sortKey: "CREATED_AT",
	},
	{
		label: "Bán chạy nhất",
		key: "BEST_SELLING",
		reverse: true,
		sortKey: "BEST_SELLING",
	},
	{
		label: "Giá tăng dần",
		key: "PRICE_ASC",
		reverse: false,
		sortKey: "PRICE",
	},
	{
		label: "Giá giảm dần",
		key: "PRICE_DESC",
		reverse: true,
		sortKey: "PRICE",
	},
];

const CollectionTitle = ({ title, isLoading }) => {
	if (isLoading) {
		return (
			<Skeleton radius="sm">
				<p className="text-start text-3xl font-bold mb-9">Tất cả sản phẩm</p>
			</Skeleton>
		);
	}
	return <p className="text-start text-3xl font-bold mb-9">{title}</p>;
};

const CollectionPage = ({ params }) => {
	const { collectionName } = React.use(params);
	const [products, setProducts] = React.useState([]);
	const [cursor, setCursor] = React.useState(null);
	const [hasNextPage, setHasNextPage] = React.useState(true);
	const [isLoadingMore, setIsLoadingMore] = React.useState(false);
	const [collectionTitle, setCollectionTitle] = React.useState(null);
	const loaderRef = React.useRef(null);

	const isAllProducts = collectionName.toLowerCase() === "all";

	const [filter, setFilter] = React.useState(filterOptions[0].key);
	const [sortKey, setSortKey] = React.useState(filterOptions[0].sortKey);
	const [reverse, setReverse] = React.useState(filterOptions[0].reverse);

	const { data, error, isLoading } = isAllProducts
		? fetchAllProducts(cursor, sortKey, reverse)
		: fetchCollectionByHandle(collectionName, cursor, sortKey, reverse);

	React.useEffect(() => {
		if (data?.data?.title && !collectionTitle) {
			setCollectionTitle(data.data.title);
		}
	}, [data?.data?.title]);

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

	const handleFilterChange = (selectedKey) => {
		const selectedOption = filterOptions.find((option) => option.key === selectedKey);
		setFilter(selectedKey);
		setSortKey(selectedOption.sortKey);
		setReverse(selectedOption.reverse);
		setCursor(null);
		setProducts([]);
	};

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
				rootMargin: "100px",
				threshold: 0.1,
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
			<div className="container mx-auto px-4 py-14">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-1/4">
						<Card radius="sm" shadow="none">
							<CardBody>
								<Skeleton className="h-8 w-64 mb-9 rounded-lg" />
							</CardBody>
						</Card>

						<div className="flex flex-col gap-4">
							<p className="text-sm font-medium">Sắp xếp theo</p>
							<RadioGroup
								value={filter}
								onValueChange={handleFilterChange}
								orientation="vertical"
								classNames={{
									base: "gap-4",
									wrapper: "gap-4",
								}}>
								{filterOptions.map((option) => (
									<Radio key={option.key} value={option.key}>
										{option.label}
									</Radio>
								))}
							</RadioGroup>
						</div>
					</div>

					<div className="container mx-auto px-4 py-14 w-full">
						<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
							{[...Array(8)].map((_, index) => (
								<div key={index} className="flex flex-col items-center gap-4">
									<Skeleton className="h-72 w-full rounded-lg" />
									<Skeleton className="h-6 w-32" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-14">
			<div className="flex flex-col lg:flex-row gap-8">
				<div className=" lg:w-1/4 ">
					<Card radius="sm" shadow="none" className="sticky top-20">
						<CardBody>
							<CollectionTitle
								title={collectionTitle || "Tất cả sản phẩm"}
								isLoading={isLoading && !cursor}
							/>
						</CardBody>

						<CardBody>
							<div className="flex flex-col gap-4">
								<p className="text-sm font-medium">Sắp xếp theo</p>
								<RadioGroup
									value={filter}
									onValueChange={handleFilterChange}
									orientation="vertical"
									classNames={{
										base: "gap-4",
										wrapper: "gap-4",
									}}>
									{filterOptions.map((option) => (
										<Radio key={option.key} value={option.key}>
											{option.label}
										</Radio>
									))}
								</RadioGroup>
							</div>
						</CardBody>
					</Card>
				</div>

				<div className="lg:w-3/4">
					<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
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
			</div>
		</div>
	);
};

export default CollectionPage;

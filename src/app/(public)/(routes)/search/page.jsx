"use client";

import ProductCard from "@/components/ui/ProductCard";
import { searchProducts } from "@/services/api.services";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const SearchResultTitle = ({ keyword, count, isLoading }) => {
	if (isLoading) {
		return (
			<Skeleton radius="sm">
				<p className="text-start text-3xl font-bold mb-9">Đang tìm kiếm...</p>
			</Skeleton>
		);
	}

	if (!keyword) {
		return <p className="text-start text-3xl font-bold mb-9">Vui lòng nhập từ khóa tìm kiếm</p>;
	}

	return (
		<p className="text-start text-3xl font-bold mb-9">
			Kết quả tìm kiếm cho "{keyword}" ({count} sản phẩm)
		</p>
	);
};

const SearchPage = () => {
	const searchParams = useSearchParams();
	const keyword = searchParams.get("search") || "";
	const [products, setProducts] = React.useState([]);
	const [cursor, setCursor] = React.useState(null);
	const [hasNextPage, setHasNextPage] = React.useState(true);
	const [isLoadingMore, setIsLoadingMore] = React.useState(false);
	const loaderRef = React.useRef(null);

	const { data, error, isLoading } = searchProducts(keyword, cursor);

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
			{ threshold: 0.1 },
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, [hasNextPage, isLoadingMore, loadMoreProducts]);

	// Reset khi keyword thay đổi
	React.useEffect(() => {
		setCursor(null);
		setProducts([]);
	}, [keyword]);

	if (isLoading && !cursor) {
		return (
			<div className="container mx-auto px-4 py-14">
				<SearchResultTitle isLoading={true} />
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{[...Array(10)].map((_, i) => (
						<Skeleton key={i} className="h-[400px] rounded-lg" />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-14">
			<SearchResultTitle keyword={keyword} count={products.length} />

			{products.length === 0 && !isLoading ? (
				<Card shadow="none">
					<CardBody>
						<p className="text-center text-xl">Không tìm thấy sản phẩm nào phù hợp</p>
					</CardBody>
				</Card>
			) : (
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{products.map((product, index) => (
						<ProductCard product={product} key={`${product.id}+${index}`} />
					))}
				</div>
			)}

			{isLoadingMore && (
				<div className="mt-8 flex justify-center items-center py-4">
					<div className="w-10 h-10 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
				</div>
			)}

			{!hasNextPage && products.length > 0 && (
				<div className="mt-8 flex justify-center items-center py-4">
					<p className="text-sm font-bold">Không còn sản phẩm nào</p>
				</div>
			)}

			<div ref={loaderRef} className="h-20 mt-4"></div>
		</div>
	);
};

export default SearchPage;

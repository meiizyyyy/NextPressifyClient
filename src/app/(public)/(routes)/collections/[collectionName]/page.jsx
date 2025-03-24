"use client";

import CardContentComponents from "@/components/ui/CardContent";
import ProductCard from "@/components/ui/ProductCard";
import { fetchCollectionByHandle } from "@/services/api.services";
import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import { useParams } from "next/navigation";
import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

const CollectionPage = ({ params }) => {
	const { collectionName } = React.use(params);
	const [productsList, setProductsList] = useState([]);
	const [cursor, setCursor] = useState(null);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const prevDataRef = useRef(null);
	const prevCursorRef = useRef(null);

	// Fetch dữ liệu với cursor hiện tại
	const { data, error, isLoading } = fetchCollectionByHandle(collectionName, cursor);

	// Xử lý dữ liệu trả về từ API
	useEffect(() => {
		// Kiểm tra nếu data hoặc cursor đã thay đổi thực sự
		if (data?.data && (prevDataRef.current !== data || prevCursorRef.current !== cursor)) {
			// Lưu lại tham chiếu hiện tại
			prevDataRef.current = data;
			prevCursorRef.current = cursor;

			// Xử lý dữ liệu
			if (cursor === null || prevCursorRef.current === null) {
				// Lần đầu tải: gán dữ liệu
				setProductsList(data.data.productsList || []);
			} else {
				// Tải thêm: thêm vào danh sách cũ
				setProductsList((prev) => {
					const newProducts = data.data.productsList || [];
					// Kiểm tra trùng lặp
					const uniqueNewProducts = newProducts.filter(
						(newProduct) => !prev.some((p) => p.id === newProduct.id),
					);
					return [...prev, ...uniqueNewProducts];
				});
			}

			// Cập nhật trạng thái phân trang
			setHasNextPage(data.data.pageInfo?.hasNextPage || false);
			setIsLoadingMore(false);
		}
	}, [data, cursor]);

	// Hàm tải thêm sản phẩm
	const loadMore = useCallback(() => {
		if (
			data?.data?.pageInfo?.endCursor &&
			hasNextPage &&
			!isLoadingMore &&
			data.data.pageInfo.endCursor !== cursor
		) {
			setIsLoadingMore(true);
			setCursor(data.data.pageInfo.endCursor);
		}
	}, [data?.data?.pageInfo?.endCursor, hasNextPage, isLoadingMore, cursor]);

	if (isLoading && !productsList.length) {
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
					<p className="text-start text-3xl mb-9">Collection: {data?.data?.title}</p>
				</CardBody>
			</Card>

			<div className="grid grid-cols-2 gap-6 grid-rows-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{productsList.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>

			{isLoadingMore && (
				<div className="flex justify-center mt-8">
					<Skeleton className="h-10 w-32" />
				</div>
			)}

			{hasNextPage && !isLoadingMore && (
				<div className="flex justify-center mt-8">
					<Button onPress={loadMore} color="primary" className="px-4 py-2 mb-8">
						Tải thêm sản phẩm
					</Button>
				</div>
			)}
		</div>
	);
};

export default CollectionPage;

"use client";

import { fetchNewsBlogs } from "@/services/api.services";
import ArticleCard from "@/components/ui/ArticleCard";
import Link from "next/link";
import { Button } from "@heroui/react";

function LatestNews() {
	const { data, error, isLoading } = fetchNewsBlogs();

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{[1, 2, 3].map((index) => (
					<div key={index} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-4">
						<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return <div>Đã xảy ra lỗi khi tải tin tức</div>;
	}

	const newsList = data?.data?.articles?.slice(0, 3) || [];

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Tin tức mới nhất</h2>
				<Button as={Link} href="/blogs/news" variant="light" className="">
					Xem tất cả
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{newsList.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</div>
	);
}

export default LatestNews;

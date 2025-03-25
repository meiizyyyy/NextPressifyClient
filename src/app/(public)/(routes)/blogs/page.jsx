"use client";

import React, { useState, useEffect } from "react";
import { fetchNewsBlogs } from "@/services/api.services";
import ArticleCard from "@/components/ui/ArticleCard";
import { Skeleton } from "@heroui/react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const BlogsPage = () => {
	const [articles, setArticles] = useState([]);
	const [pageInfo, setPageInfo] = useState({ hasNextPage: false, endCursor: null });
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const { ref, inView } = useInView();

	const { data, isLoading } = fetchNewsBlogs(pageInfo.endCursor);

	useEffect(() => {
		if (data?.data) {
			if (pageInfo.endCursor) {
				setArticles((prev) => [...prev, ...data.data.articles]);
			} else {
				setArticles(data.data.articles);
			}
			setPageInfo(data.data.pageInfo);
		}
	}, [data]);

	useEffect(() => {
		if (inView && pageInfo.hasNextPage && !isLoadingMore) {
			setIsLoadingMore(true);
		}
	}, [inView, pageInfo.hasNextPage, isLoadingMore]);

	if (isLoading && !articles.length) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div key={item} className="space-y-4">
							<Skeleton className="w-full h-48 rounded-lg" />
							<Skeleton className="w-3/4 h-6" />
							<Skeleton className="w-1/2 h-4" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Tin Tức & Bài Viết</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{articles.map((article) => (
					<Link href={`/blogs/news-blog/${article.handle}`} key={article.id}>
						<ArticleCard article={article} />
					</Link>
				))}
			</div>
			{pageInfo.hasNextPage && (
				<div ref={ref} className="w-full h-20 flex items-center justify-center">
					{isLoadingMore && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3].map((item) => (
								<div key={item} className="space-y-4">
									<Skeleton className="w-full h-48 rounded-lg" />
									<Skeleton className="w-3/4 h-6" />
									<Skeleton className="w-1/2 h-4" />
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default BlogsPage;

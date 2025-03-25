"use client";

import { fetchNewsBlogs } from "@/services/api.services";
import { Card, CardBody, CardFooter, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

const LatestNews = () => {
	const [newsList, setNewsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchNews = useCallback(async () => {
		try {
			const response = await fetchNewsBlogs();
			if (response?.data?.articles) {
				setNewsList(response.data.articles.slice(0, 3));
			}
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{[1, 2, 3].map((index) => (
					<Card key={index} className="animate-pulse">
						<CardBody>
							<div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						</CardBody>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Tin tức mới nhất</h2>
				<Link href="/blogs/news" className="text-primary">
					Xem tất cả
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{newsList.map((article) => (
					<Card key={article.id} className="hover:shadow-lg transition-shadow">
						<CardBody>
							<Image
								src={article.image?.url || "/placeholder.png"}
								alt={article.title}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
							<p className="text-sm text-gray-500 line-clamp-3">{article.excerpt}</p>
						</CardBody>
						<CardFooter>
							<Link href={`/blogs/news/${article.handle}`} className="text-primary">
								Đọc thêm
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default LatestNews;

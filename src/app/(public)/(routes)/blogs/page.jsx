import React from "react";
import { fetchNewsBlogs } from "@/services/api.services";
import ArticleCard from "@/components/ui/ArticleCard";
import { Skeleton } from "@heroui/react";
import Link from "next/link";

const BlogsPage = () => {
	const { data, isLoading } = fetchNewsBlogs();

	if (isLoading) {
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
				{data?.data?.articles?.map((article) => (
					<Link href={`/blogs/news-blog/${article.handle}`} key={article.id}>
						<ArticleCard article={article} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default BlogsPage;

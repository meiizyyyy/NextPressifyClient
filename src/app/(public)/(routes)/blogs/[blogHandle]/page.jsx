"use client";

import React from "react";
import { useParams } from "next/navigation";
import { fetchNewsBlogs } from "@/services/api.services";
import ArticleCard from "@/components/ui/ArticleCard";
import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@heroui/react";
import Link from "next/link";

const BlogDetailPage = () => {
	const { blogHandle } = useParams();
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

	const blog = data?.data;

	if (!blog) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-2xl font-bold mb-4">Không tìm thấy blog</h1>
					<p className="text-gray-600">Blog bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumbs className="mb-10">
				<BreadcrumbItem>
					<Link href="/">Trang chủ</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link href="/blogs/news">News Feed</Link>
				</BreadcrumbItem>
			</Breadcrumbs>

			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
				<p className="text-gray-600">Khám phá các bài viết mới nhất và thú vị nhất từ chúng tôi</p>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{blog.articles?.map((article) => (
					<Link href={`/blogs/${blogHandle}/${article.handle}`} key={article.id}>
						<ArticleCard article={article} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default BlogDetailPage;

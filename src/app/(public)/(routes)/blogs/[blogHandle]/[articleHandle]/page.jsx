"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Skeleton, Image, Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { fetchNewsBlogs } from "@/services/api.services";
import Link from "next/link";

const ArticleDetailPage = () => {
	const { blogHandle, articleHandle } = useParams();
	const { data, isLoading } = fetchNewsBlogs();

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<Skeleton className="w-full h-96 rounded-lg mb-8" />
					<Skeleton className="w-3/4 h-8 mb-4" />
					<Skeleton className="w-1/2 h-4 mb-8" />
					<div className="space-y-4">
						<Skeleton className="w-full h-4" />
						<Skeleton className="w-full h-4" />
						<Skeleton className="w-3/4 h-4" />
					</div>
				</div>
			</div>
		);
	}

	const article = data?.data?.articles?.find((item) => item.handle === articleHandle);

	if (!article) {
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
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
					<p className="text-gray-600">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
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
				<BreadcrumbItem>
					<Link href={`/blogs/${article.blog.handle}/${articleHandle}`} className="">
						{article.title}
					</Link>
				</BreadcrumbItem>
			</Breadcrumbs>

			<article className=" mx-auto">
				<div className="relative min-w-full h-auto mb-8">
					<Image
						src={article.image?.url || "/placeholder.jpg"}
						alt={article.title}
						className="object-cover rounded-lg"
					/>
				</div>
				<header className="mb-8">
					<h1 className="text-3xl font-bold mb-4">{article.title}</h1>
					<div className="flex items-center text-gray-500 space-x-2">
						{article.author?.name && <span>{article.author.name}</span>}
						{article.author?.name && article.publishedAt && <span>•</span>}
						{article.publishedAt && (
							<span>
								{new Date(article.publishedAt).toLocaleDateString("vi-VN", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						)}
					</div>
				</header>
				<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
			</article>
		</div>
	);
};

export default ArticleDetailPage;

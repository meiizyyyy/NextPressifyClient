import React from "react";

import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const ArticleCard = ({ article }) => {
	const { title, handle, image, publishedAt, author } = article;

	return (
		<Card className="h-full hover:shadow-lg transition-shadow duration-300">
			<div className="relative w-full ">
				<Image src={image?.url || "/placeholder.jpg"} alt={title} className="object-cover rounded-t-lg" />
			</div>
			<CardBody className="p-0">
				<div className="p-4">
					<h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
					<div className="flex items-center text-sm text-gray-500 space-x-2">
						{author?.name && <span>{author.name}</span>}
						{author?.name && publishedAt && <span>•</span>}
						{publishedAt && (
							<span>
								{new Date(publishedAt).toLocaleDateString("vi-VN", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						)}
					</div>
				</div>
			</CardBody>
			<CardFooter className="px-4 pb-4">
				<button className="text-primary hover:text-primary-dark font-medium">Đọc thêm →</button>
			</CardFooter>
		</Card>
	);
};

export default ArticleCard;

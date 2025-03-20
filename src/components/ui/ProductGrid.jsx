"use client";

import React from "react";
import { Skeleton } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

const ProductGrid = ({ products }) => {
	if (!products?.length) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-600">Không có sản phẩm nào trong danh mục này.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{products.map((product) => (
				<Link key={product.handle} href={`/products/${product.handle}`} className="group">
					<div className="flex flex-col gap-4">
						<div className="relative aspect-square overflow-hidden rounded-lg">
							{product.media?.edges?.[0]?.node?.image?.url ? (
								<Image
									src={product.media.edges[0].node.image.url}
									alt={product.title}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							) : (
								<div className="w-full h-full bg-gray-200 flex items-center justify-center">
									<span className="text-gray-400">No image</span>
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="font-semibold group-hover:text-primary">{product.title}</h3>
							<div className="flex items-center gap-2">
								<span className="text-lg font-bold">
									{product.priceRangeV2?.minVariantPrice?.amount}
								</span>
								{product.compareAtPriceRange?.maxVariantCompareAtPrice?.amount && (
									<span className="text-sm text-gray-500 line-through">
										{product.compareAtPriceRange.maxVariantCompareAtPrice.amount}
									</span>
								)}
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProductGrid;

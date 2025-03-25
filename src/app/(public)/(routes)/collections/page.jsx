"use client";

import CollectionGrid from "@/components/ui/CollectionGrid";
import React from "react";
import { fetchBrandCategoriesCollection, fetchProductCategoriesCollection } from "@/services/api.services";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import Link from "next/link";

const Collections = () => {
	return (
		<div className="w-full flex flex-col gap-10 my-10">
			<Breadcrumbs>
				<BreadcrumbItem>
					<Link href="#">Trang chủ</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link href="/collections">Danh mục cửa hàng</Link>
				</BreadcrumbItem>
			</Breadcrumbs>
			<CollectionGrid heading="Danh Mục Theo Thương Hiệu" fetchData={fetchBrandCategoriesCollection} />
			<CollectionGrid heading="Danh Mục Theo Loại Sản Phẩm" fetchData={fetchProductCategoriesCollection} />
		</div>
	);
};

export default Collections;

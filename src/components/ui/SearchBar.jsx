"use client";

import { Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height={height || size}
			role="presentation"
			viewBox="0 0 24 24"
			width={width || size}
			{...props}>
			<path
				d="M11.5 21C16.7467 21 16.7467 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
			/>
			<path
				d="M22 22L20 20"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

// Hàm tiện ích để tạo URL với tham số tìm kiếm
function createUrl(pathname, params) {
	const paramsString = params
		? Object.entries(params)
				.filter(([_key, value]) => value !== undefined && value !== "")
				.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
				.join("&")
		: "";

	const queryString = paramsString ? `?${paramsString}` : "";

	return `${pathname}${queryString}`;
}

const SearchBar = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const search = formData.get("search");

		if (!search) return;

		router.push(createUrl("/search", { search }));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const value = e.target.value;
			if (!value) return;
			router.push(createUrl("/search", { search: value }));
		}
	};

	const handleClear = () => {
		if (search) {
			router.push("/search");
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				classNames={{
					base: "max-w-full sm:min-w-[20rem] h-10",
					mainWrapper: "h-full",
					input: "text-small",
					inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
				}}
				placeholder="Tìm kiếm sản phẩm..."
				size="sm"
				startContent={<SearchIcon size={18} />}
				type="search"
				isClearable
				key={search}
				name="search"
				defaultValue={search || ""}
				autoComplete="off"
				onKeyDown={handleKeyDown}
				onClear={handleClear}
				aria-label="Tìm kiếm sản phẩm"
			/>
		</form>
	);
};

export default SearchBar;

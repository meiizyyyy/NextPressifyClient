"use client";

import React from "react";
import Link from "next/link";
import { Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const Footer = () => {
	return (
		<footer className="relative mt-96">
			{/* Gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10" />

			<div className="container mx-auto px-4 py-12 relative">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Thông tin cửa hàng */}
					<div className="col-span-1">
						<Link href="/" className="flex items-center mb-4">
							Nextifyyy
						</Link>
						<p className="text-default-500 mb-4">
							Chúng tôi cung cấp các sản phẩm chất lượng cao với giá cả phải chăng.
						</p>
						<div className="flex space-x-4">
							<Button
								isIconOnly
								radius="full"
								variant="light"
								className="bg-background/20 hover:bg-background/30 backdrop-blur-sm">
								<Icon icon="mdi:facebook" className="text-xl" />
							</Button>
							<Button
								isIconOnly
								radius="full"
								variant="light"
								className="bg-background/20 hover:bg-background/30 backdrop-blur-sm">
								<Icon icon="mdi:instagram" className="text-xl" />
							</Button>
							<Button
								isIconOnly
								radius="full"
								variant="light"
								className="bg-background/20 hover:bg-background/30 backdrop-blur-sm">
								<Icon icon="mdi:twitter" className="text-xl" />
							</Button>
						</div>
					</div>

					{/* Liên kết nhanh */}
					<div className="col-span-1">
						<h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
						<ul className="space-y-2">
							<li>
								<Button
									as={Link}
									href="/"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Trang chủ
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/collections/all"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Tất cả sản phẩm
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/about"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Giới thiệu
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/contact"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Liên hệ
								</Button>
							</li>
						</ul>
					</div>

					{/* Danh mục */}
					<div className="col-span-1">
						<h3 className="text-lg font-semibold mb-4">Danh mục</h3>
						<ul className="space-y-2">
							<li>
								<Button
									as={Link}
									href="/collections/all"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Tất cả sản phẩm
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/collections/laptop"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Laptop
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/collections"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Tất cả danh mục
								</Button>
							</li>
							<li>
								<Button
									as={Link}
									href="/blogs/news"
									variant="light"
									className="text-default-500 hover:text-foreground bg-transparent">
									Newfeeds
								</Button>
							</li>
						</ul>
					</div>

					{/* Thông tin liên hệ */}
					<div className="col-span-1">
						<h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
						<ul className="space-y-2">
							<li className="flex items-center text-default-500">
								<Icon icon="mdi:map-marker" className="text-xl mr-2" />
								Nguyễn Thái Học, Sơn Tây, Hà Nội
							</li>
							<li className="flex items-center text-default-500">
								<Icon icon="mdi:phone" className="text-xl mr-2" />
								+84 123 456 789
							</li>
							<li className="flex items-center text-default-500">
								<Icon icon="mdi:email" className="text-xl mr-2" />
								ducdanghoang96@gmail.com
							</li>
						</ul>
					</div>
				</div>

				{/* Phần bản quyền */}
				<div className="border-t border-default-100 mt-8 pt-8 text-center text-default-500">
					<p>&copy; {new Date().getFullYear()} Nextifyyy. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

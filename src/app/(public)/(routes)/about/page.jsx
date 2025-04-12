"use client";

import React from "react";
import { Card, Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const AboutPage = () => {
	return (
		<div className="container mx-auto px-4 py-12">
			{/* Hero Section */}
			<div className="text-center mb-16">
				<h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
				<p className="text-default-500 max-w-2xl mx-auto">
					Nextifyyy - Nơi cung cấp những sản phẩm chất lượng cao với giá cả phải chăng
				</p>
			</div>

			{/* Mission Section */}
			<div className="grid md:grid-cols-2 gap-8 mb-16">
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold">Sứ Mệnh Của Chúng Tôi</h2>
					<p className="text-default-500">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</p>
					<p className="text-default-500">
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
				</div>
				<div className="relative h-64 rounded-lg overflow-hidden">
					<Image src="/about/mission.jpg" alt="Our Mission" className="object-cover w-full h-full" />
				</div>
			</div>

			{/* Values Section */}
			<div className="mb-16">
				<h2 className="text-2xl font-semibold text-center mb-8">Giá Trị Cốt Lõi</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<Card className="p-6">
						<div className="flex items-center mb-4">
							<Icon icon="mdi:star" className="text-2xl text-primary mr-2" />
							<h3 className="text-xl font-semibold">Chất Lượng</h3>
						</div>
						<p className="text-default-500">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
					</Card>
					<Card className="p-6">
						<div className="flex items-center mb-4">
							<Icon icon="mdi:heart" className="text-2xl text-primary mr-2" />
							<h3 className="text-xl font-semibold">Đam Mê</h3>
						</div>
						<p className="text-default-500">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat.
						</p>
					</Card>
					<Card className="p-6">
						<div className="flex items-center mb-4">
							<Icon icon="mdi:handshake" className="text-2xl text-primary mr-2" />
							<h3 className="text-xl font-semibold">Tin Cậy</h3>
						</div>
						<p className="text-default-500">
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
							pariatur.
						</p>
					</Card>
				</div>
			</div>

			{/* Team Section */}
			<div className="mb-16">
				<h2 className="text-2xl font-semibold text-center mb-8">Đội Ngũ Của Chúng Tôi</h2>
				<div className="grid md:grid-cols-4 gap-6">
					<Card className="p-4 text-center">
						<div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
							<Image src="/about/team1.jpg" alt="Team Member" className="object-cover w-full h-full" />
						</div>
						<h3 className="text-lg font-semibold">Đặng Hoàng Đức</h3>
						<p className="text-default-500">CEO & Founder</p>
					</Card>
					<Card className="p-4 text-center">
						<div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
							<Image src="/about/team2.jpg" alt="Team Member" className="object-cover w-full h-full" />
						</div>
						<h3 className="text-lg font-semibold">Đặng Hoàng Đức</h3>
						<p className="text-default-500">Marketing Director</p>
					</Card>
					<Card className="p-4 text-center">
						<div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
							<Image src="/about/team3.jpg" alt="Team Member" className="object-cover w-full h-full" />
						</div>
						<h3 className="text-lg font-semibold">Đặng Hoàng Đức</h3>
						<p className="text-default-500">Technical Lead</p>
					</Card>
					<Card className="p-4 text-center">
						<div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
							<Image src="/about/team4.jpg" alt="Team Member" className="object-cover w-full h-full" />
						</div>
						<h3 className="text-lg font-semibold">Đặng Hoàng Đức</h3>
						<p className="text-default-500">Customer Service</p>
					</Card>
				</div>
			</div>

			{/* History Section */}
			<div className="mb-16">
				<h2 className="text-2xl font-semibold text-center mb-8">Hành Trình Phát Triển</h2>
				<div className="space-y-8">
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="text-primary font-semibold">2015</span>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Khởi Nghiệp</h3>
							<p className="text-default-500">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="text-primary font-semibold">2018</span>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Mở Rộng</h3>
							<p className="text-default-500">
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="text-primary font-semibold">2020</span>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Đổi Mới</h3>
							<p className="text-default-500">
								Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="text-primary font-semibold">2025</span>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-2">Tương Lai</h3>
							<p className="text-default-500">
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="text-center">
				<h2 className="text-2xl font-semibold mb-4">Bạn Có Câu Hỏi?</h2>
				<p className="text-default-500 mb-6 max-w-2xl mx-auto">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua.
				</p>
				<Button color="primary" size="lg">
					Liên Hệ Chúng Tôi
				</Button>
			</div>
		</div>
	);
};

export default AboutPage;

"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

const ContactPage = () => {
	return (
		<div className="flex mt-20 mb-96 flex-col gap-4">
			<Card>
				<CardBody className="text-2xl font-bold text-center">Kết nối với chúng tôi </CardBody>
			</Card>

			<div className="flex mt-20 gap-4">
				<Card className="max-w-[400px] hover:scale-105">
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Facebook</p>
							<p className="text-small text-default-500">facebook.com</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>Make beautiful websites regardless of your design experience.</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link isExternal showAnchorIcon href="https://facebook.com/meiizyyyy">
							Đi đến Facebook
						</Link>
					</CardFooter>
				</Card>
				<Card className="max-w-[400px] hover:scale-105">
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">Github</p>
							<p className="text-small text-default-500">github.com</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>Make beautiful websites regardless of your design experience.</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link isExternal showAnchorIcon href="https://github.com/meiizyyyy">
							Đi đến Github
						</Link>
					</CardFooter>
				</Card>
				<Card className="max-w-[400px] hover:scale-105">
					<CardHeader className="flex gap-3">
						<Image
							alt="heroui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">HeroUI</p>
							<p className="text-small text-default-500">heroui.com</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>Make beautiful websites regardless of your design experience.</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
							Visit source code on GitHub.
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default ContactPage;

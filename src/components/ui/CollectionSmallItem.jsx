import { Button, Card, CardFooter, Image } from "@heroui/react";
import React from "react";
import Link from "next/link";

const CollectionSmallItem = ({ title, description, image, path }) => {
	return (
		<div className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-300 p-5">
			<Link href={path} className="my-auto">
				<Image src={image?.url} alt="collection" />
			</Link>
			<div className="">
				<Link href={path} color="default" variant="light" className="text-center font-bold">
					{title}
				</Link>
			</div>
		</div>
	);
};

export default CollectionSmallItem;

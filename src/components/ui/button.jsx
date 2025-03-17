"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonComponent = ({ size, variant, color, path, content }) => {
	const router = useRouter();

	return (
		<Button
			as={Link}
			href={path}
			
			size={size}
			variant={variant}
			radius="sm"
			color={color || undefined}
			className="relative text-base overflow-visible hover:-translate-y-1 px-12 bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0">
			{content}
		</Button>
	);
};

export default ButtonComponent;

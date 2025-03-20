"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import BannerSlider from "@/components/home/BannerSlider";
import InfomationBar from "@/components/InfomationBar";
import Image from "next/image";
import React from "react";

const PublicLayouts = ({ children }) => {
	const pathname = usePathname();

	const isHomePage = pathname === "/";
	return (
		<>
			{/* <InfomationBar /> */}
			<Header />
			{isHomePage && <BannerSlider />}
			<main className="container mx-auto mt-4 px-3 flex gap-2 ">{children}</main>
		</>
	);
};

export default PublicLayouts;

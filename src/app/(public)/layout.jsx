"use client";

import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import BannerSlider from "@/components/home/BannerSlider";
import React from "react";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ui/ChatBot";
const PublicLayouts = ({ children }) => {
	const pathname = usePathname();

	const isHomePage = pathname === "/";
	return (
		<>
			<Header />
			{isHomePage && <BannerSlider />}
			<main className="container mx-auto mt-4 px-3 flex gap-2 justify-center">{children}</main>
			<ChatBot />
			<Footer />
		</>
	);
};

export default PublicLayouts;

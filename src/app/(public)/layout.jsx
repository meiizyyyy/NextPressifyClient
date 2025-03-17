"use client";

import Header from "@/components/Header";
import InfomationBar from "@/components/InfomationBar";
import Image from "next/image";
import React from "react";

const PublicLayouts = ({ children }) => {
	return (
		<>
			{/* <InfomationBar /> */}
			<Header />

			<main className="container mx-auto mt-4 px-3 flex gap-2">{children}</main>
		</>
	);
};

export default PublicLayouts;

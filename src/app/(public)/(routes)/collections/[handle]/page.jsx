"use client";

import React from "react";
import CollectionDetail from "@/components/ui/CollectionDetail";

const CollectionPage = ({ params }) => {
	const { handle } = params;

	return <CollectionDetail handle={handle} />;
};

export default CollectionPage;

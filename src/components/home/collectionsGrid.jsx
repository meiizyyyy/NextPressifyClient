import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Image, CardHeader } from "@heroui/react";
import { fetchHomePageMarketing } from "@/services/api.services";
import HomePageMarketingGrid from "../skeletons/HomePageMarketingGrid";

const CollectionsGrid = () => {
	const { data, error, isLoading } = fetchHomePageMarketing();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		if (data && data.data && data.data.articles) {
			setArticles(data.data.articles);
		}
	}, [data]);

	if (isLoading) return <div>{HomePageMarketingGrid()}</div>;
	if (error) return <div>Error loading data</div>;

	const getCardClass = (index) => {
		switch (index % 5) {
			case 0:
				return "col-span-12 sm:col-span-7 h-[300px]";
			case 1:
				return "col-span-12 sm:col-span-5 h-[300px]";
			case 2:
				return "col-span-12 sm:col-span-5 h-[300px]";
			case 3:
				return "col-span-12 sm:col-span-7 h-[300px]";
			case 4:
				return "col-span-12 sm:col-span-12 h-[300px]";
			default:
				return "col-span-12 sm:col-span-5 h-[300px]";
		}
	};

	return (
		<div className="gap-2 grid grid-cols-12 grid-rows-2 min-w-full w-full">
			{articles.map((article, index) => (
				<Card key={article.id} className={getCardClass(index)} radius="sm">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">{article.title}</p>
						<h4 className="text-white font-medium text-large">{article.title}</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src={article.image?.url}
					/>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center">
							<Image
								alt="Breathing app icon"
								className="rounded-full w-10 h-11 bg-black"
								src="https://heroui.com/images/breathing-app-icon.jpeg"
							/>
							<div className="flex flex-col">
								<p className="text-tiny text-white/60">Breathing App</p>
								<p className="text-tiny text-white/60">Get a good night's sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default CollectionsGrid;

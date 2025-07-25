import React from "react";

import { Button, Card, CardBody, CardFooter, Image, CardHeader, Skeleton } from "@heroui/react";
const HomePageMarketingGrid = () => {
	return (
		<>
			<div className="gap-2 grid grid-cols-12 grid-rows-2 w-full">
				<Card className="col-span-12 sm:col-span-7 h-[300px] " isHoverable="true" radius="none">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<Skeleton className="rounded-lg">
							<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						</Skeleton>
						<Skeleton className="rounded-lg">
							<p className="text-white font-medium text-base">Stream the Acme event</p>
						</Skeleton>
					</CardHeader>
					<Skeleton className="h-full"></Skeleton>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center"></div>
						<Skeleton className="rounded-full">
							<Button radius="full" size="sm">
								Get App
							</Button>
						</Skeleton>
					</CardFooter>
				</Card>
				<Card className="col-span-12 sm:col-span-5 h-[300px]" radius="none">
					<CardHeader className="absolute z-10 top-1 right-1 flex-col !items-end">
						<Skeleton className="rounded-lg">
							<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						</Skeleton>
						<Skeleton className="rounded-lg">
							<p className="text-white font-medium text-base">Stream the Acme event</p>
						</Skeleton>
					</CardHeader>
					<Skeleton className="h-full"></Skeleton>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center"></div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card className="col-span-12 sm:col-span-5 h-[300px]" radius="none">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<Skeleton className="rounded-lg">
							<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						</Skeleton>
						<Skeleton className="rounded-lg">
							<p className="text-white font-medium text-base">Stream the Acme event</p>
						</Skeleton>
					</CardHeader>
					<Skeleton className="h-full"></Skeleton>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center"></div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card
					isFooterBlurred
					className="w-full h-[300px] col-span-12 sm:col-span-7 hover:shadow-2xl "
					radius="none">
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<Skeleton className="rounded-lg">
							<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						</Skeleton>
						<Skeleton className="rounded-lg">
							<p className="text-white font-medium text-base">Stream the Acme event</p>
						</Skeleton>
					</CardHeader>
					<Skeleton className="h-full"></Skeleton>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center"></div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-12" radius="none">
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<Skeleton className="rounded-lg">
							<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						</Skeleton>
						<Skeleton className="rounded-lg">
							<p className="text-white font-medium text-base">Stream the Acme event</p>
						</Skeleton>
					</CardHeader>
					<Skeleton className="h-full"></Skeleton>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-2 items-center"></div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default HomePageMarketingGrid;

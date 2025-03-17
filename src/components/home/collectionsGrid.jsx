import React from "react";

import { Button, Card, CardBody, CardFooter, Image, CardHeader } from "@heroui/react";
const CollectionsGrid = () => {
	return (
		<>
			<div className="gap-2 grid grid-cols-12 grid-rows-2">
				<Card className="col-span-12 sm:col-span-7 h-[300px] " isHoverable="true" radius="sm">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
						<h4 className="text-white font-medium text-large">Stream the Acme event</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="https://hanoicomputercdn.com/media/banner/02_Janc5359a2db21a7fd79d29e3655ebe024c.jpg"
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
								<p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card className="col-span-12 sm:col-span-5 h-[300px]" radius="sm">
					<CardHeader className="absolute z-10 top-1 right-1 flex-col !items-end">
						<p className="text-tiny text-white/60 uppercase font-bold">NVIDIA GEFORCE</p>
						<h4 className="text-white font-medium text-large">RTX NEXT GENERATION</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="https://file.hstatic.net/200000722513/file/thang_02_rtx_5080_800x400.jpg"
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
								<p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card className="col-span-12 sm:col-span-5 h-[300px]" radius="sm">
					<CardHeader className="absolute z-10 top-1 flex-col !items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
						<h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Card background"
						className="z-0 w-full h-full object-cover "
						src="https://file.hstatic.net/200000722513/file/thang_03_laptop_gaming_banner_web_slider_800x400.jpg"
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
								<p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card
					isFooterBlurred
					className="w-full h-[300px] col-span-12 sm:col-span-7 hover:shadow-2xl "
					radius="sm">
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">By LENOVO</p>
						<h4 className="text-white font-medium text-2xl">LENOVO LEGION</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Card example background"
						className="z-0 w-full h-full scale-110 -translate-y-6 object-cover"
						src="https://pimwp.s3-accelerate.amazonaws.com/2021/02/1_bcmYNxXBFBUdmwjo_CPqFA.jpeg"
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
								<p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
				<Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-12" radius="sm">
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">By ASUS</p>
						<h4 className="text-white/90 font-medium text-xl uppercase">Republic of Gamers</h4>
					</CardHeader>
					<Image
						removeWrapper
						radius="sm"
						alt="Relaxing app background"
						className="z-0 w-full h-full object-cover"
						src="https://futurefive.co.nz/uploads/story/2025/01/09/2025_ROG_NVIDIA_50_series_Laptop___Desktop_lineup.webp"
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
								<p className="text-tiny text-white/60">Get a good night&#39;s sleep.</p>
							</div>
						</div>
						<Button radius="full" size="sm">
							Get App
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default CollectionsGrid;

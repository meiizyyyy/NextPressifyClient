"use client";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Input,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Card,
	CardBody,
	Button,
	Progress,
} from "@heroui/react";
import React, { useState } from "react";
import CartIcon from "@components/cart/cart_icon";
import ButtonComponent from "@/components/ui/Button";
import { fetchBottomHeaderMenu } from "@/services/api.services";
import Link from "next/link";
import LinkComponent from "./ui/Link";
import InfomationBar from "./InfomationBar";

export const AcmeLogo = () => {
	return (
		<svg fill="none" height="36" viewBox="0 0 32 32" width="36">
			<path
				clipRule="evenodd"
				d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
};

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height={height || size}
			role="presentation"
			viewBox="0 0 24 24"
			width={width || size}
			{...props}>
			<path
				d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
			/>
			<path
				d="M22 22L20 20"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// const { data, error, isLoading } = fetchBottomHeaderMenu();

	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	// const HeaderBrandData = data?.data.menu.items || [];
	// console.log(HeaderBrandData);
	return (
		<>
			<Navbar maxWidth="full" height="3rem" className="py-1">
				<NavbarContent justify="center">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
					<Link href="/">
						<NavbarBrand className="mr-4">
							<AcmeLogo />
							<p className="hidden sm:block font-bold text-inherit">Nextifyyy</p>
						</NavbarBrand>
					</Link>
					<NavbarContent className="hidden md:flex gap-10">
						<NavbarItem>
							<Link color="foreground" href="#">
								LAPTOP
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="#">
								PC
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="#">
								Màn Hình
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="#">
								VGA
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="#">
								CPU
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color="foreground" href="#">
								Newsfeed
							</Link>
						</NavbarItem>
					</NavbarContent>
				</NavbarContent>

				<NavbarContent as="div" className="items-center" justify="end">
					<Input
						classNames={{
							base: "max-w-full sm:max-w-[20rem] h-10",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper:
								"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Tìm kiếm..."
						size="sm"
						startContent={<SearchIcon size={18} />}
						type="search"
					/>
				</NavbarContent>

				<NavbarItem>
					<CartIcon />
				</NavbarItem>

				<NavbarItem>
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name="Jason Hughes"
								size="sm"
								src=""
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">zoey@example.com</p>
							</DropdownItem>
							<DropdownItem key="cart">My Cart</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
							<DropdownItem key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								className="w-full"
								color={
									index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
								}
								href="/"
								size="lg">
								{item}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
			<Card isBlurred shadow="sm" radius="none">
				{/* <CardBody className="container mx-auto flex flex-row gap-3 xl:gap-12 justify-start lg:justify-center items-center scrollbar-hide overflow-x-auto">
					{HeaderBrandData.map((item, index) => {
						return (
							<ButtonComponent
								key={`${item}-${index}`}
								size="sm"
								variant="light"
								content={item.title}
								path={item.url}
							/>
						);
					})}
				</CardBody> */}
			</Card>
		</>
	);
};

export default Header;

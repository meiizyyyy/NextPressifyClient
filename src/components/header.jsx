"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
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
	Skeleton,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import CartIcon from "@components/cart/cart_icon";
import ButtonComponent from "@/components/ui/Button";
import { fetchBottomHeaderMenu, fetchHeaderCollection, fetchHeaderMainMenu } from "@/services/api.services";
import Link from "next/link";
import LinkComponent from "./ui/Link";
import InfomationBar from "./InfomationBar";
import Image from "next/image";
import SearchBar from "./ui/SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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

const Header = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { data: headerMainData, error: headerMainError, isLoading: headerMainLoading } = fetchHeaderMainMenu();
	const {
		data: headerCollectionData,
		error: headerCollectionError,
		isLoading: headerCollectionLoading,
	} = fetchHeaderCollection();

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

	console.log("Check user context", user);

	const handleLoginClick = () => {
		router.push("/sign-in");
	};

	return (
		<>
			<Navbar
				shouldHideOnScroll
				position="static"
				height={40}
				className="w-full hidden lg:flex justify-center bg-[#191939]">
				<Image
					src="/images/thang_02_pc_gvn_banner_191b3b.webp"
					width={1200}
					height={10}
					alt="thang_02_pc_gvn_banner_191b3b"></Image>
			</Navbar>
			<Navbar
				isBlurred
				position="static"
				shouldHideOnScroll
				height="2rem"
				maxWidth="full"
				shadow="sm"
				radius="none"
				className="hidden md:flex">
				<ul className="flex gap-2 w-full justify-start md:justify-between scrollbar-hide overflow-x-auto">
					{headerCollectionLoading ? (
						<Skeleton className="w-full h-5" />
					) : (
						headerCollectionData?.data?.menu.map((item, index) => {
							return (
								<Button
									key={`${item.id}${index}`}
									as={Link}
									href={item.path}
									size="md"
									radius="sm"
									color="default"
									variant="light"
									className="">
									{item.title}
								</Button>
							);
						})
					)}
				</ul>
			</Navbar>
			<Navbar maxWidth="full" height="3rem" isBordered className="py-1">
				<NavbarContent justify="center">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
					<Link href="/">
						<NavbarBrand className="mr-4">
							<AcmeLogo />
							<p className="hidden sm:block font-bold text-inherit">Nextifyyy</p>
						</NavbarBrand>
					</Link>

					<NavbarContent className="gap-6 hidden xl:flex overflow-hidden">
						{headerMainLoading
							? [...Array(7)].map((_, index) => <Skeleton key={index} className="w-24 h-5" />)
							: headerMainData?.data?.menu?.map((item, index) => (
									<NavbarItem key={`${item.id}${index}`}>
										<Button
											key={`${item.id}${index}`}
											as={Link}
											href={item.path}
											size="md"
											radius="sm"
											color="default"
											variant="light"
											className="font-bold">
											{item.title}
										</Button>
									</NavbarItem>
							  ))}
					</NavbarContent>
				</NavbarContent>

				<NavbarContent as="div" className="items-center" justify="end">
					<SearchBar />
				</NavbarContent>

				<NavbarItem>
					<CartIcon />
				</NavbarItem>
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					{user ? (
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar
									isBordered
									as="button"
									className="transition-transform"
									color="secondary"
									name={`${user.firstName} ${user.lastName}`}
									size="sm"
									src=""
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat">
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-semibold">Đăng nhập với</p>
									<p className="font-semibold">{user.email}</p>
								</DropdownItem>
								<DropdownItem key="cart">Giỏ hàng của tôi</DropdownItem>
								<DropdownItem key="settings">Cài đặt tài khoản</DropdownItem>
								<DropdownItem key="orders">Đơn hàng của tôi</DropdownItem>
								<DropdownItem key="logout" color="danger" onPress={logout}>
									Đăng xuất
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					) : (
						<Button isIconOnly radius="full" variant="light" onPress={handleLoginClick}>
							<Avatar name="User" size="sm" />
						</Button>
					)}
				</NavbarItem>
				<NavbarMenu>
					{headerCollectionLoading ? (
						<Skeleton className="w-full h-5" />
					) : (
						headerMainData?.data?.menu?.map((item, index) => (
							<NavbarItem key={`${item.id}${index}`}>
								<Button
									key={`${item.id}${index}`}
									as={Link}
									href={item.path}
									size="lg"
									radius="sm"
									color="default"
									variant="light"
									className="">
									{item.title}
								</Button>
							</NavbarItem>
						))
					)}
				</NavbarMenu>
			</Navbar>
		</>
	);
};

export default Header;

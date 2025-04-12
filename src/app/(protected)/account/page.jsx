"use client";

import { useAuth } from "@/contexts/AuthContext";
import { updateCustomer } from "@/services/api.services";
import {
	Button,
	Card,
	CardBody,
	Input,
	Tabs,
	Tab,
	Avatar,
	Breadcrumbs,
	BreadcrumbItem,
	Form,
	Switch,
	addToast,
} from "@heroui/react";
import Link from "next/link";
import { unauthorized, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountPage = () => {
	const { user, logout, setUser } = useAuth();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("profile");
	const [isSelected, setIsSelected] = useState(user?.acceptsMarketing || false);

	useEffect(() => {
		if (!user) {
			unauthorized();
		}
	}, [user, router]);

	if (!user) {
		unauthorized();
	}

	const handleProfileSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData);

		const customerData = {
			customer: {
				customerAccessToken: sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken"),
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				email: user?.email,
				acceptsMarketing: isSelected,
			},
		};

		try {
			const res = await updateCustomer(customerData);
			console.log("res", res);

			if (res?.data?.status === "success" && res?.data?.customer?.data?.customerUpdate?.customer?.id) {
				const updatedUser = {
					...user,
					firstName: data.firstName,
					lastName: data.lastName,
					phone: data.phone,
					acceptsMarketing: isSelected,
				};
				setUser(updatedUser);

				// Cập nhật thông tin trong localStorage
				localStorage.setItem("user", JSON.stringify(updatedUser));

				addToast({
					title: "Cập nhật thông tin tài khoản",
					description: res?.data?.message,
					color: "success",
				});
			}
		} catch (error) {
			console.log("error", error);
			addToast({
				title: "Có lỗi xảy ra trong quá trình cập nhật thông tin",
				description: error.message,
				variant: "error",
			});
		}
	};

	const handlePasswordChange = async (event) => {
		event.preventDefault();
		// TODO: Implement password change logic
	};

	return (
		<div className="container mx-auto px-4 py-8 mb-[666px]">
			<Breadcrumbs className="mb-16">
				<BreadcrumbItem>
					<Link href="/">Trang chủ</Link>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<Link href={`/account`}>Tài khoản</Link>
				</BreadcrumbItem>
			</Breadcrumbs>
			<h1 className="text-2xl font-bold mb-8">Tài khoản của tôi</h1>

			<Tabs
				selectedKey={activeTab}
				onSelectionChange={setActiveTab}
				variant="bordered"
				aria-label="Account Tabs"
				classNames={{
					tab: "text-lg font-semibold",
					tabList: "gap-12",
					cursor: "w-full bg-primary",
					panel: "pt-4 overflow-auto",
				}}>
				<Tab key="profile" title="Thông tin cá nhân">
					<Card>
						<CardBody>
							<div className="flex flex-col items-center justify-center mt-5 gap-6">
								<Avatar
									isBordered
									as="button"
									className="transition-transform"
									color="secondary"
									name={`${user.firstName} ${user.lastName}`}
									size="lg"
									src=""
								/>
								<p className="text-lg font-semibold">{user?.email}</p>
							</div>

							<Form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
								<div>
									<label className="block text-sm font-medium mb-2">Tên</label>
									<Input
										isRequired
										defaultValue={user?.firstName}
										labelPlacement="outside"
										name="firstName"
										type="text"
										variant="underlined"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Họ</label>
									<Input
										isRequired
										defaultValue={user?.lastName}
										labelPlacement="outside"
										name="lastName"
										type="text"
										variant="underlined"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Email</label>
									<Input
										type="email"
										name="email"
										isReadOnly
										variant="underlined"
										defaultValue={user?.email}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Số điện thoại</label>
									<Input
										isRequired
										defaultValue={user?.phone}
										labelPlacement="outside"
										name="phone"
										type="text"
										variant="underlined"
									/>
								</div>
								<div className="col-span-2 flex justify-start items-center gap-4">
									<label className="block text-sm font-medium mb-2">
										Nhận thông tin mới nhất qua email
									</label>
									<Switch
										name="acceptsMarketing"
										isSelected={isSelected}
										onValueChange={setIsSelected}
									/>
								</div>
								<div className="col-span-2 flex justify-end gap-4">
									<Button color="primary" type="submit">
										Cập nhật thông tin
									</Button>
								</div>
							</Form>
						</CardBody>
					</Card>
				</Tab>

				<Tab key="password" title="Đổi mật khẩu">
					<Card>
						<CardBody>
							<form onSubmit={handlePasswordChange} className="space-y-4">
								<div>
									<label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
									<Input type="password" name="currentPassword" className="w-full" required />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
									<Input type="password" name="newPassword" className="w-full" required />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
									<Input type="password" name="confirmPassword" className="w-full" required />
								</div>
								<div className="flex justify-end">
									<Button color="primary" type="submit">
										Đổi mật khẩu
									</Button>
								</div>
							</form>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
};

export default AccountPage;

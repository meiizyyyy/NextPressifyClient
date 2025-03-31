"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button, Card, CardBody, Input, Tabs, Tab, Checkbox, Switch } from "@heroui/react";
import { unauthorized, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountPage = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("profile");

	useEffect(() => {
		if (!user) {
			unauthorized();
		}
	}, [user, router]);

	if (!user) {
		unauthorized();
	}

	return (
		<div className="container mx-auto px-4 py-8 mb-[666px]">
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
					panel: "pt-4",
				}}>
				<Tab key="profile" title="Thông tin cá nhân">
					<Card>
						<CardBody>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium mb-2">Họ</label>
									<Input type="text" defaultValue={user.firstName} className="w-full" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Tên</label>
									<Input type="text" defaultValue={user.lastName} className="w-full" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Email</label>
									<Input type="email" defaultValue={user.email} className="w-full" isReadOnly />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Số điện thoại</label>
									<Input type="tel" defaultValue={user.phone} className="w-full" />
								</div>
								<div className="flex items-center gap-2">
									<Switch isSelected={true} />
									<label className="block text-sm font-medium mb-2">
										Đồng ý nhận thông tin mới nhất
									</label>
								</div>
							</div>
							<div className="mt-6">
								<Button color="primary">Cập nhật thông tin</Button>
							</div>
						</CardBody>
					</Card>
				</Tab>

				<Tab key="orders" title="Đơn hàng">
					<Card>
						<CardBody>
							<p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
						</CardBody>
					</Card>
				</Tab>

				<Tab key="addresses" title="Địa chỉ">
					<Card>
						<CardBody>
							<p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
						</CardBody>
					</Card>
				</Tab>

				<Tab key="settings" title="Cài đặt">
					<Card>
						<CardBody>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
									<Input type="password" className="w-full" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
									<Input type="password" className="w-full" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
									<Input type="password" className="w-full" />
								</div>
								<div className="flex gap-4">
									<Button color="primary">Đổi mật khẩu</Button>
									<Button color="danger" variant="flat" onPress={logout}>
										Đăng xuất
									</Button>
								</div>
							</div>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
};

export default AccountPage;

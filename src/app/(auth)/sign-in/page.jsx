"use client";

import Aurora from "@/components/ui/Aurora";
import { Button, Input, Checkbox, Link, Form, Divider, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { getCustomerDetails, login } from "@/services/api.services";
import { useAuth } from "@/contexts/AuthContext";

export const AcmeIcon = ({ size = 32, width, height, ...props }) => (
	<svg fill="none" height={size || height} viewBox="0 0 32 32" width={size || width} {...props}>
		<path
			clipRule="evenodd"
			d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
			fill="currentColor"
			fillRule="evenodd"
		/>
	</svg>
);

const SignInPage = (props) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isRememberMe, setIsRememberMe] = React.useState(false);
	const { login: authLogin } = useAuth();

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData);
			const res = await login(data);

			if (res.status === "success") {
				const accessToken = res.token;
				const expiresAt = res.expiresAt;
				const customerDetails = await getCustomerDetails(accessToken);

				addToast({
					title: "Đăng Nhập Thành Công",
					description: "Chào mừng trở lại",
					color: "success",
				});
				authLogin(customerDetails, accessToken, expiresAt, isRememberMe);
			} else {
				addToast({
					title: "Đăng Nhập Thất Bại",
					description: res.message || "Có lỗi xảy ra trong quá trình đăng nhập",
					color: "danger",
				});
			}
		} catch (error) {
			addToast({
				title: "Đăng Nhập Thất Bại",
				description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
				color: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full h-full ">
			<Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
			<div className="flex h-full w-full items-center justify-center fixed inset-0">
				<div className="flex w-full max-w-lg flex-col gap-4 rounded-large">
					<div className="flex flex-col items-center pb-6">
						<Link href="/" color="foreground">
							<AcmeIcon size={60} />
						</Link>
						<p className="text-xl font-medium">Chào mừng trở lại</p>
						<p className="text-small text-default-500 mt-2">Đăng nhập để tiếp tục</p>
					</div>
					<Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
						<Input
							isRequired
							label="Email"
							name="email"
							placeholder="Nhập email"
							type="email"
							variant="underlined"
						/>

						<Input
							isRequired
							endContent={
								<button type="button" onClick={toggleVisibility}>
									{isVisible ? (
										<Icon
											className="pointer-events-none text-2xl text-default-400"
											icon="solar:eye-closed-linear"
										/>
									) : (
										<Icon
											className="pointer-events-none text-2xl text-default-400"
											icon="solar:eye-bold"
										/>
									)}
								</button>
							}
							label="Mật khẩu"
							name="password"
							placeholder="Nhập mật khẩu"
							type={isVisible ? "text" : "password"}
							variant="underlined"
						/>

						<div className="flex w-full items-center justify-between px-1 py-2">
							<Checkbox
								name="remember"
								size="sm"
								isSelected={isRememberMe}
								onValueChange={setIsRememberMe}>
								Giữ tôi đăng nhập
							</Checkbox>
							<Link className="text-default-500" href="#" size="sm">
								Quên mật khẩu?
							</Link>
						</div>
						<Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
							Đăng nhập
						</Button>
					</Form>
					<div className="flex items-center gap-4 py-2">
						<Divider className="flex-1" />
						<p className="shrink-0 text-tiny text-default-500">HOẶC</p>
						<Divider className="flex-1" />
					</div>
					<div className="flex flex-col gap-2">
						<Button startContent={<Icon icon="flat-color-icons:google" width={24} />} variant="bordered">
							Tiếp tục với Google
						</Button>
						<Button
							startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
							variant="bordered">
							Tiếp tục với Github
						</Button>
					</div>
					<p className="text-center text-small">
						Chưa có tài khoản?&nbsp;
						<Link href="/sign-up" size="sm">
							Đăng ký
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;

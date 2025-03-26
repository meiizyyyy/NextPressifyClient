"use client";

import { Button, Input, Checkbox, Link, Form, Divider, useDisclosure, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import Aurora from "@/components/ui/Aurora";
import { signUp } from "@/services/api.services";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";

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

const SignUpPage = (props) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toggleVisibility = () => setIsVisible(!isVisible);
	const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

	const onSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const formData = new FormData(e.currentTarget);
			const data = Object.fromEntries(formData);

			if (data.password !== data.password_confirmation) {
				addToast({
					title: "Đăng Ký Thất Bại",
					description: "Mật khẩu xác nhận không khớp",
					color: "danger",
				});
				return;
			}

			const customerData = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				password: data.password,
				password_confirmation: data.password_confirmation,
			};
			console.log(customerData);
			const res = await signUp(customerData);

			if (res.status === "success") {
				addToast({
					title: "Đăng Ký Thành Công",
					description: res.message || res.data.message || "Đăng ký thành công",
					color: "success",
				});
				onOpen();
			} else {
				addToast({
					title: "Đăng Ký Thất Bại",
					description: res.message || res.errors || "Có lỗi xảy ra trong quá trình đăng ký",
					color: "danger",
				});
			}
		} catch (error) {
			addToast({
				title: "Đăng Ký Thất Bại",
				description: error.errors || error.message || "Có lỗi xảy ra, vui lòng thử lại",
				color: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuccess = () => {
		onClose();
		router.push("/sign-in");
	};

	return (
		<div className="w-full h-full ">
			<Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
			<div className="flex h-full w-full items-center justify-center fixed inset-0">
				<div className="flex w-full max-w-lg flex-col gap-4 rounded-large px-8 pb-10 pt-6">
					<div className="flex flex-col items-center pb-6">
						<Link href="/" color="foreground">
							<AcmeIcon size={60} />
						</Link>
						<p className="text-xl font-medium">Chào mừng đến với Nextifyyyy</p>
						<p className="text-small text-default-500 mt-2">Đăng ký để tiếp tục</p>
					</div>
					<Form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<Input
							isRequired
							label="Tên"
							labelPlacement="outside"
							name="firstName"
							type="text"
							variant="underlined"
						/>
						<Input
							isRequired
							label="Họ và tên đệm"
							labelPlacement="outside"
							name="lastName"
							type="text"
							variant="underlined"
						/>
						<Input
							isRequired
							label="Số điện thoại"
							labelPlacement="outside"
							name="phone"
							type="text"
							variant="underlined"
						/>
						<Input
							isRequired
							label="Email"
							labelPlacement="outside"
							name="email"
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
							labelPlacement="outside"
							name="password"
							type={isVisible ? "text" : "password"}
							variant="underlined"
						/>
						<Input
							isRequired
							endContent={
								<button type="button" onClick={toggleConfirmVisibility}>
									{isConfirmVisible ? (
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
							label="Xác nhận mật khẩu"
							labelPlacement="outside"
							name="password_confirmation"
							type={isConfirmVisible ? "text" : "password"}
							variant="underlined"
						/>
						<Checkbox isRequired className="py-4" size="sm">
							Tôi đồng ý với&nbsp;
							<Link className="relative z-[1]" href="#" size="sm">
								Điều khoản sử dụng
							</Link>
							&nbsp; và&nbsp;
							<Link className="relative z-[1]" href="#" size="sm">
								Điều khoản bảo mật
							</Link>
						</Checkbox>
						<Button color="primary" type="submit" isLoading={isLoading} className="w-full">
							Đăng ký
						</Button>
					</Form>
					<p className="text-center text-small">
						Đã có tài khoản?&nbsp;
						<Link href="/sign-in" size="sm">
							Đăng nhập
						</Link>
					</p>
				</div>
			</div>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<ModalHeader>Đăng ký thành công!</ModalHeader>
					<ModalBody>
						<p>Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để tiếp tục.</p>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onPress={handleSuccess}>
							Đăng nhập
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default SignUpPage;

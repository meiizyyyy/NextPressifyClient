import {
	Button,
	Card,
	CardBody,
	Divider,
	Image,
	Input,
	Link,
	Skeleton,
	useDisclosure,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@heroui/react";
import { useCart } from "@/contexts/CartContext";
import { addToCart, createCart, removeFromCart, updateCartLine } from "@/services/api.services";
import { addToast } from "@heroui/react";
import { useState } from "react";

const ProductCardOnCart = ({ item }) => {
	const { cart, handleGetCart, cartId } = useCart();
	const merchandise = item.merchandise;
	const product = merchandise.product;
	const [quantity, setQuantity] = useState(item.quantity);
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const handleQuantityChange = async (change) => {
		setIsLoading(true);
		try {
			if (!cartId) {
				addToast({
					title: "Lỗi",
					description: "Không tìm thấy giỏ hàng",
					color: "danger",
				});
				return;
			}

			const newQuantity = Math.max(1, quantity + change);
			const res = await updateCartLine({
				cartId,
				linesId: item.id,
				quantity: newQuantity,
			});

			if (res.data.success) {
				if (res?.data?.data?.warning) {
					addToast({
						title: "Cập nhật giỏ hàng",
						description: res.data.data.warning.message,
						color: "warning",
					});
					// Cập nhật lại số lượng thực tế từ server
					setQuantity(res.data.data.cart.lines.find((line) => line.id === item.id).quantity);
				} else {
					setQuantity(newQuantity);
					addToast({
						title: "Cập nhật giỏ hàng",
						description: "Số lượng sản phẩm đã được cập nhật",
						color: "success",
					});
				}
				// Refresh giỏ hàng
				handleGetCart(cartId);
				setIsLoading(false);
			}
		} catch (error) {
			addToast({
				title: "Lỗi",
				description: error.message || "Có lỗi xảy ra khi cập nhật giỏ hàng",
				color: "danger",
			});
			setIsLoading(false);
		}
	};

	const handleRemove = async () => {
		try {
			if (!cartId) {
				addToast({
					title: "Lỗi",
					description: "Không tìm thấy giỏ hàng",
					color: "danger",
				});
				return;
			}

			const res = await removeFromCart({
				cartId,
				lineIds: [item.id],
			});

			if (res.data.success) {
				addToast({
					title: "Xóa sản phẩm",
					description: "Sản phẩm đã được xóa khỏi giỏ hàng",
					color: "success",
				});
				handleGetCart(cartId);
			}
		} catch (error) {
			addToast({
				title: "Lỗi",
				description: error.message || "Có lỗi xảy ra khi xóa sản phẩm",
				color: "danger",
			});
		}
	};

	return (
		<>
			<Card radius="sm" shadow="none" className="w-full min-h-fit flex flex-row gap-4">
				<div className="w-full max-w-32 max-h-32">
					<Image
						alt={product.handle}
						className="object-cover max-w-32 min-h-32 max-h-32 "
						src={product.featuredImage.url}
					/>
				</div>

				<CardBody>
					<Link href={`/products/${product.handle}`} className="text-md font-semibold mb-2  text-black">
						{product.title}
					</Link>
					<div className="flex flex-col items-start justify-between gap-2 mb-4">
						<div className="flex items-center gap-2">
							{isLoading ? (
								<Skeleton className="w-8 h-4">
									<p className="text-lg font-bold text-black-500">{quantity}</p> x
								</Skeleton>
							) : (
								<>
									<p className="text-lg font-bold text-black-500">{quantity}</p> x
								</>
							)}
							<span className="text-lg font-bold text-red-500">
								{new Intl.NumberFormat("vi-VN").format(parseInt(merchandise.price.amount))}
								{merchandise.price.currencyCode}
							</span>
							{item.cost.compareAtAmountPerQuantity && (
								<span className="text-sm text-gray-500 line-through">
									{new Intl.NumberFormat("vi-VN").format(
										parseInt(item.cost.compareAtAmountPerQuantity.amount),
									)}{" "}
									VND
								</span>
							)}
						</div>
						<div className="flex items-center justify-between gap-2 w-full">
							<Button
								size="sm"
								variant="flat"
								onPress={() => handleQuantityChange(-1)}
								isDisabled={quantity <= 1}>
								-
							</Button>
							<Button size="sm" variant="flat" onPress={() => handleQuantityChange(1)}>
								+
							</Button>
							<Button color="danger" variant="flat" onPress={onOpen} className="ml-auto">
								Xóa
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Xóa khỏi giỏ hàng</ModalHeader>
							<ModalBody>
								<p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
							</ModalBody>
							<ModalFooter>
								<Button color="primary" variant="light" onPress={onClose}>
									Quay lại
								</Button>
								<Button color="danger" onPress={handleRemove}>
									Xóa
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProductCardOnCart;

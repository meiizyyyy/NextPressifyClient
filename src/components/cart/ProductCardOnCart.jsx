import { Button, Card, CardBody, Divider, Image, Input } from "@heroui/react";
import { useCart } from "@/contexts/CartContext";
import { addToCart, createCart } from "@/services/api.services";
import { addToast } from "@heroui/react";
import { useState } from "react";

const ProductCardOnCart = ({ item }) => {
	const { cart, setCart } = useCart();
	const merchandise = item.merchandise;
	const product = merchandise.product;

	// const [quantity, setQuantity] = useState(item.quantity);

	// const handleQuantityChange = async (newQuantity) => {
	// 	try {
	// 		const cartId = localStorage.getItem("cartId");
	// 		if (!cartId) {
	// 			const res = await createCart();
	// 			localStorage.setItem("cartId", res.cart.id);
	// 		}

	// 		const res = await addToCart({
	// 			cartId: localStorage.getItem("cartId"),
	// 			variantId: item.merchandise.id,
	// 			quantity: newQuantity,
	// 		});

	// 		if (res.data.success) {
	// 			setQuantity(newQuantity);
	// 			addToast({
	// 				title: "Cập nhật giỏ hàng",
	// 				description: "Số lượng sản phẩm đã được cập nhật",
	// 				color: "success",
	// 			});
	// 		} else {
	// 			addToast({
	// 				title: "Lỗi",
	// 				description: "Không thể cập nhật số lượng sản phẩm",
	// 				color: "danger",
	// 			});
	// 		}
	// 	} catch (error) {
	// 		addToast({
	// 			title: "Lỗi",
	// 			description: "Có lỗi xảy ra khi cập nhật giỏ hàng",
	// 			color: "danger",
	// 		});
	// 	}
	// };

	// const handleRemove = () => {
	// 	const newCart = cart.filter((cartItem) => cartItem.node.id !== item.node.id);
	// 	setCart(newCart);
	// 	addToast({
	// 		title: "Xóa sản phẩm",
	// 		description: "Sản phẩm đã được xóa khỏi giỏ hàng",
	// 		color: "success",
	// 	});
	// };

	return (
		// <Card className="w-full mb-4 ">
		// 	<CardBody className="flex flex-row gap-4 h-fit">
		// 		<div className="w-full md:w-1/4 scale-75">
		// 			<Image
		// 				alt={product.handle}
		// 				className="object-cover w-full h-32 md:h-40 rounded-lg"
		// 				src={product.featuredImage.url}
		// 			/>
		// 		</div>
		// 		<div className="flex-1">
		// 			<h3 className="text-md font-semibold mb-2">{product.title}</h3>
		// 			{/* <p className="text-gray-600 mb-2">{item.merchandise.title}</p> */}
		// 			<div className="flex items-center gap-2 mb-4">
		// 				<span className="text-lg font-bold text-red-500">
		// 					{new Intl.NumberFormat("vi-VN").format(parseInt(merchandise.price.amount))}
		// 					{merchandise.price.currencyCode}
		// 				</span>
		// 				{/* {item.cost.compareAtAmountPerQuantity && (
		// 					<span className="text-sm text-gray-500 line-through">
		// 						{new Intl.NumberFormat("vi-VN").format(
		// 							parseInt(item.cost.compareAtAmountPerQuantity.amount),
		// 						)}{" "}
		// 						VND
		// 					</span>
		// 				)} */}
		// 			</div>
		// 			<div className="flex items-center gap-4">
		// 				<div className="flex items-center gap-2">
		// 					<Button
		// 						size="sm"
		// 						variant="flat"
		// 						// onPress={() => handleQuantityChange(Math.max(1, quantity - 1))}
		// 						// isDisabled={quantity <= 1}
		// 					>
		// 						-
		// 					</Button>
		// 					<Input
		// 						type="number"
		// 						min="1"
		// 						value={item.quantity}
		// 						// onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
		// 						className="w-16 text-center"
		// 					/>
		// 					<Button
		// 						size="sm"
		// 						variant="flat"
		// 						// onPress={() => handleQuantityChange(quantity + 1)}
		// 						// isDisabled={quantity >= item.merchandise.availableForSale}
		// 					>
		// 						+
		// 					</Button>
		// 				</div>
		// 				<Button
		// 					color="danger"
		// 					variant="flat"
		// 					// onPress={handleRemove}
		// 					className="ml-auto">
		// 					Xóa
		// 				</Button>
		// 			</div>
		// 		</div>
		// 	</CardBody>
		// </Card>
		<Card radius="sm" shadow="none" className="w-full min-h-fit flex flex-row gap-4">
			<div className="w-full max-w-32 max-h-32">
				<Image
					alt={product.handle}
					className="object-cover max-w-32 min-h-32 max-h-32 "
					src={product.featuredImage.url}
				/>
			</div>

			<CardBody>
				<h3 className="text-md font-semibold mb-2">{product.title}</h3>
				<div className="flex items-center justify-between gap-2 mb-4">
					<div className="flex items-center gap-2">
						<p className="text-lg font-bold text-black-500">{item.quantity}</p> x
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
					<div className="flex items-center gap-2">
						<Button
							size="sm"
							variant="flat"
							// onPress={() => handleQuantityChange(Math.max(1, quantity - 1))}
							// isDisabled={quantity <= 1}
						>
							-
						</Button>
						<Button
							size="sm"
							variant="flat"
							// onPress={() => handleQuantityChange(quantity + 1)}
							// isDisabled={quantity >= item.merchandise.availableForSale}
						>
							+
						</Button>
						<Button
							color="danger"
							variant="flat"
							// onPress={handleRemove}
							className="ml-auto">
							Xóa
						</Button>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						{/* <Input
							type="number"
							min="1"
							value={item.quantity}
							// onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
							className="w-16 text-center"
						/> */}
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ProductCardOnCart;

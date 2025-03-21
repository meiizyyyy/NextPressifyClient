import React from "react";
import ProductCard from "./ProductCard";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductSlider = ({ products, limit }) => {
	if (products.length === 0) {
		return <div>Không có sản phẩm nào</div>;
	}

	const productsToShow = limit ? products.slice(0, limit) : products;

	console.log("check data slider", products);

	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
			slidesPerView={2}
			breakpoints={{
				640: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 10,
				},
				1280: {
					slidesPerView: 5,
					spaceBetween: 10,
				},
			}}
			autoplay={({ delay: 5000 }, { disableOnInteraction: true })}
			spaceBetween={10}
			className="container h-max">
			{productsToShow.map((product, index) => {
				return (
					<SwiperSlide key={product.id} className="py-4">
						<ProductCard product={product} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default ProductSlider;

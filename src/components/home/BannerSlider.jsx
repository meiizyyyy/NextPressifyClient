import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { fetchHomePageBanner } from "@/services/api.services";
import { Image, Skeleton } from "@heroui/react";
import Link from "next/link";

const BannerSlider = () => {
	const { data, error, isLoading } = fetchHomePageBanner();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		if (data && data.data && data.data.articles) {
			setArticles(data.data.articles);
		}
	}, [data]);

	if (isLoading) {
		return <Skeleton className="w-full h-[360px]"></Skeleton>;
	}

	return (
		<Swiper
			slidesPerView={1}
			modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Autoplay]}
			pagination={{
				clickable: true,
			}}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			loop={true}
			className=" mx-auto">
			{articles.map((article, index) => (
				<SwiperSlide key={article.id}>
					<Image
						radius="none"
						src={article.image.url}
						className="max-h-[400px] w-full"
						classNames={{ wrapper: "!max-w-full" }}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BannerSlider;

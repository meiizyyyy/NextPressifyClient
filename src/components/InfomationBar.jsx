"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
const InfomationBar = () => {
	return (
		<div className="w-full">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
				slidesPerView={1}
				autoplay={{ delay: 1000 }}
				loop={true}
				effect="fade"
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
				}}>
				<SwiperSlide>Mon-Fri: 9:00 AM - 5:30 PM</SwiperSlide>
				<SwiperSlide>(00) 1234 5678 | 9:00 AM - 5:30 PM</SwiperSlide>
				<SwiperSlide>12312312312123</SwiperSlide>
				<SwiperSlide>dsfasdfafasdfasdfsa</SwiperSlide>
				<SwiperSlide>vbxcvbdfgfergregergegr</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default InfomationBar;

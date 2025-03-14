"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const InfomationBar = () => {
	return (
		<div className="container mx-auto">
			<Swiper slidesPerView={1} autoplay={[true, 400]} centeredSlides={true} loop={true}>
				<SwiperSlide>Mon-Fri: 9:00 AM - 5:30 PM</SwiperSlide>
				<SwiperSlide>(00) 1234 5678 | 9:00 AM - 5:30 PM</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default InfomationBar;

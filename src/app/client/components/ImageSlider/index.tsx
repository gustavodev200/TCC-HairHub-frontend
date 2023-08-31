"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ImageSwiper
            src="https://heygoldie.com/blog/wp-content/uploads/2021/12/barber-shop-decor-ideas.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://dudubarber.com.br/wp-content/uploads/2023/02/vintage-chairs-in-barbershop.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ae7a6e2e2ccd1343b0b1878/1647887765067-YYK19UXH3LH6OZFJ8Y5I/DSC08193.jpg?format=2500w"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2309847913/display_1500/stock-photo-portrait-of-smiling-bearded-caucasian-male-hairdresser-with-hair-bun-in-black-apron-at-hair-salon-2309847913.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.wineenthusiast.com/wp-content/uploads/2022/09/HERO_Barbershop_Cuts_and_Cocktails_Credit_David_J_Crewe_1920x1280.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://mercafefaststore.vtexassets.com/assets/vtex.file-manager-graphql/images/1c3efb13-7168-4371-95e2-9be1390bef4b___b4fe059689c4e7cd10e18e39aa88df9d.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export const ImageSwiper = styled.img`
  display: flex;
  background-color: #1f1f1f;
  z-index: 1;
`;

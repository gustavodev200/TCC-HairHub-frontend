"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
          <img
            src="https://images8.alphacoders.com/468/thumb-1920-468739.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://c.wallhere.com/photos/9f/ae/Stable_Diffusion_4K_AI_art_lion_digital_art_illustration_animals-2215638.jpg!d"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://1.bp.blogspot.com/-HVu3xRoGaCw/VxvsFiKglUI/AAAAAAABN8E/TYYqdTcndNUZwGF6Y3Q_oADjMEaogqUOgCLcB/s1600/460327-uhd-wallpaper-HD-free-wallpapers-backgrounds-images-FHD-4k-download-2014-2015-2016.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/fotos-premium/papel-de-parede-da-natureza-papel-de-parede-bonito-da-natureza-papeis-de-parede-da-natureza-4k-papel-de-parede-da-natureza-hd-natureza-verde_722194-174.jpg?w=2000"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/fotos-premium/paisagem-do-outono-com-lago-e-montanhas-ao-fundo-lago-nas-montanhas-generativas-ai_627050-719.jpg?w=2000"
            alt="Slide 1"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

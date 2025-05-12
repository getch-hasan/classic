"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const banners = [
  {
    image: "/banner.svg",
    title: "Up to 10% off Voucher",
    subtitle: "iPhone 14 Series",
    id: 1,
  },
  {
    image: "/banner.jpg",
    title: "50% off Accessories",
    subtitle: "Exclusive Deals",
    id: 2,
  },
];

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures component is mounted before rendering Swiper
  }, []);

  // If not mounted yet, render nothing to prevent hydration issues
  if (!isMounted) return null;

  return (
   <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      speed={1000}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {banners?.map((item) => (
        <SwiperSlide key={item?.banner_id}>
          <div className="relative h-32 md:h-80 bg-primary">
            {/* Static Content Container */}
            <div className="absolute inset-0 flex items-center md:justify-start justify-center lg:left-44 md:left-24 z-10 ">
              <div className="text-start ">
                <h1 className="text-primary text-2xl md:text-3xl lg:text-[45px] font-extrabold capitalize">
                  {item?.title}
                </h1>
                <p className="text-xl font-thin mb-4 text-primary">
                  {item?.subtitle}
                </p>
                <button className=" font-medium absolute bottom-3 flex items-center border-b-2 text-white px-4 py-2 gap-2 hover:bg-[#000000] transition duration-300">
                  Shop Now  <span><FaArrowRight/></span>
                </button>
          
              </div>
            </div>
            {/* Sliding Image */}
            <Image
              height={400}
              width={1000}
              priority
              className="w-full h-full object-cover object-center"
              src={item?.image}
              alt={item?.title}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;

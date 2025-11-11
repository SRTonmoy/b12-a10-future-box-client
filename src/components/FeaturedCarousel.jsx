import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function FeaturedCarousel({ slides = [] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      autoplay={{ delay: 2500 }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className="py-6"
    >
      {(slides.length === 0 ? [{ title: "Build daily habits", text: "Track, mark complete, and grow streaks." }] : slides)
        .map((s, i) => (
          <SwiperSlide key={i} className="w-72 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-gray-600">{s.text}</p>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

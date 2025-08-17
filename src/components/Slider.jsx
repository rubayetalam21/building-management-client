import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
    return (
        <div className="py-4 mt-16">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="rounded-xl overflow-hidden"
            >
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/tMnyMVS7/building-4.jpg"
                            alt="Tech Gadget Box"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                            <h2 className="text-white text-xl md:text-3xl font-bold p-4">
                                City Building
                            </h2>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/0yYqTysr/building-3.jpg"
                            alt="Organic Beauty Box"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                            <h2 className="text-white text-xl md:text-3xl font-bold p-4">
                                Ready Apartments
                            </h2>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/GvSNnhHs/building-5.jpg"
                            alt="Book Lovers Box"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                            <h2 className="text-white text-xl md:text-3xl font-bold p-4">
                                Dream House
                            </h2>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co/7xzrNzwm/building-1.jpg"
                            alt="Luxury Home Box"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                            <h2 className="text-white text-xl md:text-3xl font-bold p-4">
                                Building Management
                            </h2>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;

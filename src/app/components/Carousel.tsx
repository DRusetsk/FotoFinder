import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ImageData = {
  id: number;
  url: string;
  alt: string;
};

interface CarouselProps {
  photoCollection: {
    imgURLs: {
      [key: string]: {url: string, metadata: {
        aperture: {
          denominator: number;
          numerator: number;
        }
        exposureTime: {
          denominator: number;
          numerator: number;
        }
        focalLength: {
          denominator: number;
          numerator: number;
        }
        iso: number;
        lensModel: string;
        model: string;
        timestamp: string;
      }}
    };
    lat: number;
    lng: number;
    locationDescription: string;
    locationName: string;
  }[];

  locationID: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel: React.FC<CarouselProps> = ({ photoCollection, locationID, setCarouselIndex }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      onSlideChange={(swiper:any) => {
        setCarouselIndex(swiper.realIndex);
      }}
    >
      {Object.entries(photoCollection[locationID].imgURLs).map(([key, value]) => (
        <SwiperSlide key={key}>
          <div className="flex justify-center">
            <Image src={value.url} alt={value.url} width={800} height={500} className="rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
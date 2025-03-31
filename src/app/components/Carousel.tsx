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

const Carousel = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/images.json");
      const data: ImageData[] = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <div className="flex justify-center">
            <Image src={image.url} alt={image.alt} width={800} height={500} className="rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
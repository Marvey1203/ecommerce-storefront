'use client'
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const slider = ({image}:any) => {
    return ( 
        <Swiper
            className="w-full"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
    >
      {image.map((imageData:any)=>{
        return(
          <SwiperSlide key={imageData.id}>

              <Image
              src={imageData.url}
              alt=''
              height={500}
              width={500}

              />

          </SwiperSlide>
        )
      })}
      </Swiper>
     );
}
 
export default slider;
import { useRef, useState } from "react";
import { CaretLeft , CaretLineRight, CaretRight } from "@phosphor-icons/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialSlider = ({ list }) => {
  SwiperCore.use([Pagination]);
  const [swiper, setSwiper] = useState(null);
  const paginationRef = useRef(null);

  return (
    <div className="reviews-carousel relative">
      <Swiper
        pagination={{
          type: "bullets",
          el: paginationRef.current,
          clickable: true,
          dynamicBullets: true,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        breakpoints={{
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        }}
      >
        {list.map((item, i) => (
          <SwiperSlide key={"feature-" + i}>
            <div className="review rounded-sm shadow-sm border border-gray-200 text-start flex gap-4">
              <div>
                <h5>{item.author}</h5>
              </div>
              <div>
                <h5 className="mb-4">{item.organization}</h5>
                <p>{item.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flecha izquierda */}
      <button
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-40 transition-opacity duration-300 ${
          swiper && swiper.isEnd ? "opacity-0" : "opacity-100"
        } hover:opacity-100`}
        onClick={() => swiper?.slidePrev()}
      >
        <CaretLeft className="w-8 h-8 text-gray-500 hover:text-gray-800" />
      </button>

      {/* Flecha derecha */}
      <button
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-40 transition-opacity duration-300 ${
          swiper && swiper.isEnd ? "opacity-0" : "opacity-100"
        } hover:opacity-100`}
        onClick={() => swiper?.slideNext()}
      >
        <CaretRight className="w-8 h-8 text-gray-500 hover:text-gray-800" />
      </button>

      <div className="relative flex justify-center">
        <div
          className="swiper-pagination reviews-carousel-pagination !bottom-0"
          ref={paginationRef}
        ></div>
      </div>
    </div>
  );
};

export default TestimonialSlider;

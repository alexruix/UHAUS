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
        autoplay={10000}
        slidesPerView={1.2}
        breakpoints={{
          992: {
            slidesPerView: 2.8,
          },
          1100: {
            slidesPerView: 3.2,
          },
        }}
      >
        {list.map((item, i) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongContent = item.content.length > 200;

    return (
      <SwiperSlide key={"feature-" + i}>
        <div className="review rounded  shadow text-start flex gap-4 sm:gap-2">
          <div>
            {/* <span className="h5 font-semibold">{item.author}</span> */}
          </div>
          <div>
            <h5 className="mb-4 h4">{item.organization}</h5>
            
            <p>
              {isExpanded || !isLongContent ? item.content : item.content.slice(0, 200) + '...'}
            </p>
            {isLongContent && (
              <button className="text-uhaus mt-2" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>

      {/* Flecha izquierda */}
      <button
        className={`absolute -left-2 top-1/2 rounded-full p-2 bg-slate-50 shadow-lg transform -translate-y-1/3 z-30 transition-opacity duration-300 ${
          swiper && swiper.isEnd ? "opacity-0" : "opacity-100"
        } hover:opacity-100`}
        aria-label="Botón anterior"
        onClick={() => swiper?.slidePrev()}
      >
        <CaretLeft className="w-8 h-8 text-gray-500 hover:text-gray-800" />
      </button>

      {/* Flecha derecha */}
      <button
        className={`absolute -right-4 top-1/2 rounded-full p-2 bg-slate-50 shadow-lg transform -translate-y-1/3 z-30 transition-opacity duration-300 ${
          swiper && swiper.isEnd ? "opacity-0" : "opacity-100"
        } hover:opacity-100`}
        aria-label="Botón siguiente"
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

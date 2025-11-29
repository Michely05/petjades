import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import card1 from "../../assets/img/carousel1.jpg";
import card2 from "../../assets/img/carousel2.jpg";
import card3 from "../../assets/img/carousel3.jpg";
import card4 from "../../assets/img/carousel4.jpg";
import card5 from "../../assets/img/carousel5.jpg";

export const MeetThePets = () => {
  const cards = [card1, card2, card3, card4, card5];

  return (
    <section className="py-16">
      <h2 className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-5 text-(--primary-color) text-center">
        CONEIX ELS NOSTRES ANIMALS
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="rounded-2xl"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <img
                  src={card}
                  alt={`Animal ${index + 1}`}
                  className="w-full h-80 object-cover cursor-pointer"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>
    </section>
  );
};

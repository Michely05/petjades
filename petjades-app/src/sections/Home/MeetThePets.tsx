import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Animal } from "../../types/Animal";

export const MeetThePets = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:7151/animals")
      .then((res) => {
        const lastFive = res.data
          .sort((a: Animal, b: Animal) => b.id - a.id)
          .slice(0, 5);

        setAnimals(lastFive);
      })
      .catch((err) => console.error("Error carregant animals:", err));
  }, []);

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
          className="2xl"
        >
          {animals.map((animal) => (
            <SwiperSlide key={animal.id}>
              <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <img
                  src={`https://localhost:7151${animal.imatgeUrl}`}
                  alt={animal.nom}
                  className="w-full h-80 object-cover cursor-pointer"
                />

                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg text-(--primary-color)">
                    {animal.nom}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>
    </section>
  );
};

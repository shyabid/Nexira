import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { useNavigate } from "react-router";
import bannerSliderData from "../../../data/bannerSliderData";
import MyButton from "../MyButton/MyButton";

const BannerSlider = () => {
  const navigate = useNavigate();
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (_, time) => {
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        loop={true}
      >
        {bannerSliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full relative  rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-[75dvh] object-cover overflow-hidden"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-primary/21 grid place-items-center p-3 backdrop-blur-xs">
                <div className="text-center space-y-3.5 max-w-2xl">
                  <h1 className="font-bold md:font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white!">
                    {item.title}
                  </h1>

                  <p className="text-white/90 sm:text-base md:text-lg">
                    {item.subtitle}
                  </p>

                  <div className="space-x-3.5">
                    <MyButton onClick={() => navigate("/all-jobs")}>
                      Explore Jobs
                    </MyButton>

                    <MyButton onClick={() => navigate("/dashboard/add-job")}>
                      Add Job
                    </MyButton>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          className="size-12 z-10 absolute bottom-4 right-4 flex items-center justify-center font-bold text-secondary dark:text-primary"
          slot="container-end"
        >
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default BannerSlider;

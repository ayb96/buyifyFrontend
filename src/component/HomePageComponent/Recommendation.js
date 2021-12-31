import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Rate from "./Rate";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function Recommendation() {
  const navigate = useNavigate();
  const [hello, setHello] = useState([]);
  const { recommendedProduct } = useSelector(
    (state) => state.recommededProduct
  );

  useEffect(() => {
    recommendedProduct &&
      recommendedProduct.map(async (value) => {
        const res = await axios.get(`/api/product/${value}`);
        console.log(res);
        setHello((prevValue) => [...prevValue, res.data]);
      });
  }, [recommendedProduct]);

  return (
    <div className="container-swip">
      <div className="title_testwrapper"></div>

      <Swiper
        navigation={true}
        effect={"coverflow"}
        slidesPerView={window.innerWidth < 768 ? 1 : 5}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {hello &&
          hello.map((val) => {
            return (
              <SwiperSlide
                className="q"
                onClick={() => {
                  navigate(`/product/${val._id}`);
                }}
              >
                <div className="flex_testimonial">
                  <img
                    className="testimonial__img"
                    src={val.image}
                    alt={val.brand}
                  />
                  <h3 className="testimonial__name">{val.name}</h3>
                  <p className="testimonial__description">{val.description}</p>
                  <div style={{ marginTop: "10px" }}>
                    <Rate productId={val._id} defaultrating={val.rating} />
                  </div>

                  <p className="price" style={{ color: "white" }}>
                    ${val.price}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
export default Recommendation;

/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { axiosConfig } from "../../utils/axiosConfig";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function RecentlyViewedProducts({ productId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RecentlyViewedProducts"],
    queryFn: () =>
      axiosConfig({
        method: "get",
        url: `/products?limit=12`,
      }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!Array.isArray(data?.data)) {
    return <p>No valid data available</p>;
  }

  const shuffledProducts = data?.data.sort(() => Math.random() - 0.5);

  const filteredProducts = shuffledProducts.filter(
    (product) => product.id !== productId,
  );

  if (filteredProducts.length === 0) {
    return <p>No products available to show</p>;
  }

  return (
    <>
      <h2 className="title-Recently-Viewed-Products">
        Recently Viewed Products
      </h2>
      <div className="box-Recently-Viewed-Products">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            1024: {
              spaceBetween: 16,
            },
            768: {
              spaceBetween: 16,
            },
          }}
        >
          {filteredProducts?.map((product) => (
            <SwiperSlide key={product?.id}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

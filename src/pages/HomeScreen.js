import React from "react";
import MainContent from "../component/HomePageComponent/mainContent";
import ProductCategory from "../component/HomePageComponent/ProductCategory";
import ProductSlider from "../component/HomePageComponent/ProductSlider";

import Title from "../component/HomePageComponent/Title";

import { useSelector } from "react-redux";
import Recommendation from "../component/HomePageComponent/Recommendation";

export default function HomeScreen() {
  const { allSearch } = useSelector((state) => state.InfiniteScrollPrduct);
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div className="container">
      {!allSearch && (
        <>
          <ProductSlider />
          {/* {userInfo && (
            <>
              <Title title="Recommended for you" />
              <Recommendation />
            </>
          )} */}
          <Title title="Our Category" />
          <ProductCategory />
        </>
      )}

      <Title title="Our Product" />
      <MainContent />
    </div>
  );
}

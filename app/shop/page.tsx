// import Featured from "../../components/Featured";
// import FeaturedGlasses from "../../components/FeaturedGlasses";
import Slider from "../../components/Slider";
import FeaturedBags from "../../components/FeaturedBags";
import React from "react";
import FeaturedBooks from "../../components/FeaturedBooks";
import Offer from "../../components/Offer";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Slider />
      <FeaturedBooks />
      {/* <FeaturedGlasses /> */}
      {/* <FeaturedBags /> */}
      {/* <Featured /> */}
      <Offer />
    </div>
  );
};

export default page;

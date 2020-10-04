import React from "react";
import SharedButton from "./../shared/button";

function HomePromotion() {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitars",
    linkTitle: "Shop now",
    linkTo: "/shop",
  };
  const generatePromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{ backgroundImage: `url(${promotion.img})` }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <SharedButton
          type="link"
          title={promotion.linkTitle}
          linkTo={promotion.linkTo}
          addStyles={{ margin: "10px 0 0 0" }}
        />
      </div>
    ) : (
      ""
    );
  return <div className="home_promotion">{generatePromotion()}</div>;
}

export default HomePromotion;

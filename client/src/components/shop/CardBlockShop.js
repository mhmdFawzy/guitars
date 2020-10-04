import React from "react";
import Card from "./../shared/card";
function CardBlockShop(props) {
  const renderCrads = (list) => {
    return list.map((card) => (
      <Card key={card._id} {...card} grid={props.grid} />
    ));
  };
  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.products ? (
            props.products.length === 0 ? (
              <div className="no_result">Sorry, no results</div>
            ) : (
              renderCrads(props.products)
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CardBlockShop;

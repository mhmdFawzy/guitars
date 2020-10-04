import React from "react";
import Card from "./../shared/card";
const renderCards = (list) =>
  list ? list.map((card, i) => <Card key={i} {...card} />) : "";
function CradBlock(props) {
  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : ""}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
}

export default CradBlock;

import React from "react";
import { connect } from "react-redux";
import SharhedButton from "./../button";
import { addToCart } from "./../../../redux/actions/userActions";
import renderCardImages from "./../../../utils/imageRender"
// const renderCardImages = (images) => {
//   if (images.length > 0) {
//     return images[0].url;
//   } else {
//     return "/images/image_not_availble.png";
//   }
// };

function Crad(props) {
  const addToCartBtn = (id) => {
    if (props.user.userData.isAuth) {
      props.dispatch(addToCart(id));
    } else {
      console.log("not logged");
    }
  };
  return (
    <div className={`card_item_wrapper ${props.grid}`}>
      <div
        className="image"
        style={{ background: `url(${renderCardImages(props.images)})` }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.brand.name}</div>
          <div className="name">{props.name}</div>
          <div className="price">${props.price}</div>
        </div>
        {props.grid ? (
          <div className="description">{props.description}</div>
        ) : (
          ""
        )}
        <div className="actions">
          <div className="button_wrapp">
            <SharhedButton
              type="link"
              altClass="card_link"
              title="View Product"
              linkTo={`/product_detail/${props._id}`}
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="button_wrapp">
            <SharhedButton
              type="bag_link"
              actionToDo={() => {
                addToCartBtn(props._id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToprops = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToprops)(Crad);

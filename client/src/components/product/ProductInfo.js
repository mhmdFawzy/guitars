import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTruck, faCheck } from "@fortawesome/free-solid-svg-icons";
import SharedButton from "./../shared/button";
import { addToCart } from "./../../redux/actions/userActions";
import { connect } from "react-redux";
// faTimes
function ProductInfo(props) {
  const addToCartBtn = (id) => {
    if (props.user.userData.isAuth) {
      props.dispatch(addToCart(id));
    } else {
      console.log("not logged");
    }
  };
  const details = props.details;
  return (
    <div>
      <h1>
        {details.brand.name}
        &nbsp;
        {details.name}
      </h1>
      <p>{details.description}</p>
      <div className="product_tags">
        {details.shipping && (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className="tag_text">
              <div>Free shipping</div>
              <div>And return</div>
            </div>
          </div>
        )}
        {details.available && (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="tag_text">
              <div>Available</div>
              <div>in store</div>
            </div>
          </div>
        )}
      </div>
      <div className="product_actions">
        <div className="price">${details.price}</div>
        <div className="cart">
          <SharedButton
            type="add_to_card"
            actionToDo={() => {
              addToCartBtn(details._id);
            }}
          />
        </div>
      </div>
      <div className="product_specifications">
        <h2>specifications</h2>
        <div>
          <div className="item">
            <strong>Frets:</strong>
            &nbsp;{details.frets}
          </div>
          <div className="item">
            <strong>Frets:</strong>
            &nbsp;{details.wood.name}
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
export default connect(mapStateToprops)(ProductInfo);

import React from "react";
import remderImage from "./../../utils/imageRender";

function CartItem({ product, removeItem }) {
  return (
    <div>
      <div className="user_product_block" key={product._id}>
        <div className="item">
          <div
            className="image"
            style={{
              background: `url(${remderImage(product.images)}) no-repeat`,
            }}
          ></div>
        </div>

        <div className="item">
          <h4>Product name</h4>
          <div>
            {product.brand.name}&nbsp;{product.name}
          </div>
        </div>
        <div className="item">
          <h4>Quantity</h4>
          <div>{product.quantity}</div>
        </div>
        <div className="item">
          <h4>Price</h4>
          <div>${product.price}</div>
        </div>
        <div className="item btn">
          <div
            className="cart_remove_btn"
            onClick={() => {
              removeItem(product._id);
            }}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

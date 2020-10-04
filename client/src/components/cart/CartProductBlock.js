import React from "react";
import CartItem from "./CartItem";
function CartProductBlock({ products, removeItem }) {
  const renderCartItems = () =>
    products.cart && products.cart.length > 0
      ? products.cart.map((product) => (
          <CartItem
            key={product._id}
            removeItem={removeItem}
            product={product}
          />
        ))
      : "";
  return <div>{renderCartItems()}</div>;
}

export default CartProductBlock;

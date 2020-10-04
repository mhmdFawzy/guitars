import React, { Component } from "react";
import UserDashboardLayout from "./../shared/user";
import CartProductBlock from "./CartProductBlock";
import CartTotal from "./CartTotal";
import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItem,
} from "./../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faSmile } from "@fortawesome/free-solid-svg-icons";
export class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  };
  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;
    if (user.userData && user.userData.cart.length > 0) {
      user.userData.cart.map((item) => {
        cartItem.push(item.id);
      });
    }
    this.props.dispatch(getCartItems(cartItem, user.userData.cart)).then(() => {
      if (this.props.user.cart.length > 0) {
        this.calculateTotal(this.props.user.cart);
      }
    });
  }
  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({ total, showTotal: true });
  };
  removeCartItem = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      this.calculateTotal(this.props.user.cart);
    });
  };
  render() {
    return (
      <UserDashboardLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            {this.props.user.userData.cart.length > 0 ? (
              <div>
                {" "}
                <CartProductBlock
                  products={this.props.user}
                  type="cart"
                  removeItem={(id) => {
                    this.removeCartItem(id);
                  }}
                />
                <CartTotal price={this.state.total} />
              </div>
            ) : (
              <div>
                {!this.state.showSuccess && (
                  <div className="cart_no_items">
                    <FontAwesomeIcon icon={faSmile} />
                    <div>You have no items yet</div>
                  </div>
                )}
                {this.state.showSuccess && (
                  <div className="cart_success">
                    <FontAwesomeIcon icon={faSmile} />
                    <div>Thank you</div>
                    <div>Your order is now complete</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </UserDashboardLayout>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Cart);

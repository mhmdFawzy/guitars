import React, { Component } from "react";
import PageTop from "./../shared/pageTop";
import { connect } from "react-redux";
import ProductImages from "./ProductImages";
import {
  getProductsDetails,
  clearProductsDetails,
} from "./../../redux/actions/productActions";
import ProductInfo from "./ProductInfo";
export class ProductDetails extends Component {
  componentDidMount() {
    this.props
      .dispatch(getProductsDetails(this.props.match.params.id))
      .then(() => {
        if (!this.props.products.prodDetails) {
          this.props.history.push("/shop");
        }
      });
  }
  componentWillUnmount() {
    this.props.dispatch(clearProductsDetails());
  }
  render() {
    return (
      <div>
        <PageTop title="Product details" />
        <div className="container">
          {this.props.products.prodDetails ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <ProductImages
                  images={this.props.products.prodDetails.images}
                />
              </div>
              <div className="right">
                <ProductInfo details={this.props.products.prodDetails} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(ProductDetails);

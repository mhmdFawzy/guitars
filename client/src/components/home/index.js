import React, { Component } from "react";
import HomeSlider from "./HomeSlider";
import HomePromotion from "./HomePromotion";
import CradBlock from "./CradBlock";

import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell,
} from "./../../redux/actions/productActions";
export class Home extends Component {
  componentDidMount() {
    if (!this.props.products.bySell) {
      this.props.dispatch(getProductsBySell()).then(() => {
        console.log(this.props);
      });
    }
    if (!this.props.products.byArrival) {
      this.props.dispatch(getProductsByArrival()).then(() => {
        console.log(this.props);
      });
    }
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CradBlock title="Best Guitars" list={this.props.products.bySell} />
        <HomePromotion />
        <CradBlock title="New Arrival" list={this.props.products.byArrival} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(Home);

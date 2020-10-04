import React, { Component } from "react";
import { connect } from "react-redux";
import PageTop from "./../shared/pageTop";
import CollapseCheckbox from "../shared/collapse/CollapseCheckbox";
import CollapseRadio from "./../shared/collapse/CollapseRadio";
import {
  getWoods,
  getBrands,
  getProductsToShop,
} from "./../../redux/actions/productActions";
import { frets, prices } from "./../../utils/filters";
import LoadMoreCards from "./LoadMoreCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
export class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      price: [],
      wood: [],
    },
  };
  componentDidMount() {
    if (!this.props.products.woods) {
      this.props.dispatch(getWoods());
    }
    if (!this.props.products.brands) {
      this.props.dispatch(getBrands());
    }
    if (!this.props.products.toShop) {
      this.props.dispatch(
        getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
      );
    }
  }
  handleFilters = (filters, categoryFilter) => {
    const newFilters = { ...this.state.filters };
    newFilters[categoryFilter] = filters;
    this.setState(
      {
        filters: newFilters,
      },
      () => {
        this.showFilteredResults(newFilters);
      }
    );
  };
  showFilteredResults = (customfilters) => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, customfilters))
      .then(() => {
        this.setState({
          skip: 0,
        });
      });
  };
  loadMoreCards = () => {
    console.log("ss");
    let skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip,
        });
      });
  };
  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : "",
    });
  };
  render() {
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initalState={true}
                title="Brands"
                list={this.props.products.brands}
                handleFilters={(filters) => {
                  this.handleFilters(filters, "brand");
                }}
              />
              <CollapseCheckbox
                initalState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => {
                  this.handleFilters(filters, "frets");
                }}
              />
              <CollapseCheckbox
                initalState={false}
                title="Woods"
                list={this.props.products.woods}
                handleFilters={(filters) => {
                  this.handleFilters(filters, "wood");
                }}
              />
              <CollapseRadio
                initalState={false}
                title="Prices"
                list={prices}
                handleFilters={(filters) => {
                  this.handleFilters(filters, "price");
                }}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => {
                      this.handleGrid();
                    }}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => {
                      this.handleGrid();
                    }}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  loadMore={() => {
                    this.loadMoreCards();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};
export default connect(mapStateToProps)(Shop);

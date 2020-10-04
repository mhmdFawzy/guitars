import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/HOC/Layout";
import Home from "./components/home";
import Shop from "./components/shop";
import Auth from "./components/HOC/Auth";
import Login from "./components/login";
import Register from "./components/register";
import UserDashboard from "./components/user";
import AddProduct from "./components/user/admin/AddProduct";
import ManageCategories from "./components/user/admin/MangeCategories";
import ProductDetails from "./components/product";
import Cart from "./components/cart";
import UserProfile from "./components/user/UserProfile";
import SiteInfo from "./components/user/admin/SiteInfo";
import PageNotFound from "./utils/PageNotFound";
export default function Routes() {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/admin/site_info" exact component={Auth(SiteInfo, true)} />
        <Route
          path="/admin/add_products"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route
          path="/user/user_profile"
          exact
          component={Auth(UserProfile, true)}
        />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductDetails, null)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound, null)} />
      </Switch>
    </Layout>
  );
}

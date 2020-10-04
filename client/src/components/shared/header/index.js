import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "./../../../redux/actions/userActions";
import { withRouter } from "react-router-dom";
export class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true,
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true,
      },
    ],
    user: [
      {
        name: "My cart",
        linkTo: "/user/cart",
        public: false,
      },
      {
        name: "My account",
        linkTo: "/user/dashboard",
        public: false,
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false,
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true,
      },
    ],
  };
  handleLogout = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };
  generateLinks = (links) => {
    let user, shownLinks;
    if (this.props.user.userData) {
      if (this.props.user.userData.isAuth) {
        user = links.filter((link) => {
          return link.public === false;
        });

        shownLinks = (
          <div>
            <div className="cart_link">
              <span>
                {this.props.user.userData.cart
                  ? this.props.user.userData.cart.length
                  : 0}
              </span>
              <Link to="/user/cart">My cart</Link>
            </div>
            <Link to="/user/dashboard">My account</Link>
            <div className="log_out_link" onClick={this.handleLogout}>
              Log out
            </div>
          </div>
        );
      } else {
        user = links.filter((link) => {
          return link.public === true;
        });
        shownLinks = user.map((link, i) => {
          return (
            <Link key={i} to={link.linkTo}>
              {link.name}
            </Link>
          );
        });
      }
    }

    return shownLinks;
  };
  pageLinks = (links) => {
    return links.map((link, i) => {
      return (
        <Link key={i} to={link.linkTo}>
          {link.name}
        </Link>
      );
    });
  };
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.generateLinks(this.state.user)}</div>
            <div className="bottom">{this.pageLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(withRouter(Header));

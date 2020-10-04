import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const links = [
  {
    name: "My account",
    linkTo: "/user/dashboard",
  },
  {
    name: "User information",
    linkTo: "/user/user_profile",
  },
  {
    name: "My cart",
    linkTo: "/user/cart",
  },
];
const adminLinks = [
  {
    name: "Site info",
    linkTo: "/admin/site_info",
  },
  {
    name: "Add products",
    linkTo: "/admin/add_products",
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage_categories",
  },
];
function UserDashboardLayout(props) {
  const generateLinks = (links) => {
    let generatedLinks = links.map((link, i) => (
      <Link key={i} to={link.linkTo}>
        {link.name}
      </Link>
    ));
    return generatedLinks;
  };
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
          {props.user.userData && props.user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(adminLinks)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(UserDashboardLayout);

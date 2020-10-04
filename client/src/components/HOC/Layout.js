import React, { Component } from "react";
import Header from "../shared/header";
import Footer from "../shared/footer";

export class layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default layout;

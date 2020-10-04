import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser } from "./../../redux/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function (ComposedComponent, privacy, adminRoute = null) {
  class AuthCheck extends Component {
    state = { loading: true };
    generatedComponent = () => {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress thickness={7} style={{ color: "#2196F3" }} />
          </div>
        );
      } else {
        //   this props from router
        return <ComposedComponent user={this.props} {...this.props} />;
      }
    };
    componentDidMount() {
      this.props.dispatch(authUser()).then((response) => {
        let user = this.props.user.userData;
        if (user && !user.isAuth) {
          if (privacy === true) {
            this.props.history.push("/login");
          }
        } else {
          if (privacy === false) {
            this.props.history.push("/user/dashboard");
          }
        }
                this.setState({ loading: false });

      });
    }
    render() {
      return this.generatedComponent();
    }
  }
  const mapStateToProps = (state) => {
    return { user: state.user };
  };
  return connect(mapStateToProps)(AuthCheck);
}

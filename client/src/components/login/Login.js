import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "./../shared/form/FormField";
// we get with router as we push user to dashboard this is not the main component
// in the route so we pass it to handle this
import { withRouter } from "react-router-dom";
import {
  update,
  generateData,
  isFormValid,
} from "./../shared/form/formActions";
import SharedButton from "./../shared/button";
import { loginUser } from "./../../redux/actions/userActions";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Please eneter your email",
        },
        validation: {
          email: true,
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Please eneter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormdate,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");
    //   here we check if the form is valid and if true we get response of the action
    //   and then we push the user to dashboard
    //   if not valid we make form error true
    formIsValid
      ? this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
          response.payload.loginSuccess
            ? this.props.history.push("/user/dashboard")
            : this.setState({ formError: true });
        })
      : this.setState({ formError: true });
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.submitForm}>
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"password"}
            formdata={this.state.formdata.password}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : (
            ""
          )}
          <SharedButton
            onClick={this.submitForm}
            title="Login"
            addStyle={{ margin: "10px 0 0 0", border: "none", outline: "none" }}
          />
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));

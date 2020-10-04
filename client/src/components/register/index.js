import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
// we get with router as we push user to dashboard this is not the main component
// in the route so we pass it to handle this
import { withRouter } from "react-router-dom";
import {
  update,
  generateData,
  isFormValid,
} from "./../shared/form/formActions";
import FormField from "./../shared/form/FormField";
import SharedButton from "./../shared/button";
import { registerUser } from "./../../redux/actions/userActions";
export class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      firstname: {
        element: "input",
        value: "",
        config: {
          name: "firstname_input",
          type: "text",
          placeholder: "Please eneter your firstname",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Please eneter your lastname",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
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
      confirmpassword: {
        element: "input",
        value: "",
        config: {
          name: "confirmpassword_input",
          type: "password",
          placeholder: "Please confirm your password",
        },
        validation: {
          required: true,
          confirm: "password",
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdate,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");
    //   here we check if the form is valid and if true we get response of the action
    //   and then we push the user to dashboard
    //   if not valid we make form error true
    formIsValid
      ? this.props
          .dispatch(registerUser(dataToSubmit))
          .then((response) => {
            if (response.payload.success) {
              this.setState({ formError: false, formSuccess: true });
              setTimeout(() => {
                this.props.history.push("/login");
              }, 3000);
            } else {
              this.setState({
                formError: true,
              });
            }
          })
          .catch(() => {
            this.setState({
              formError: true,
            });
          })
      : this.setState({ formError: true });
  };
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.submitForm}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"firstname"}
                      formdata={this.state.formdata.firstname}
                      change={(element) => {
                        this.updateForm(element);
                      }}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      formdata={this.state.formdata.lastname}
                      change={(element) => {
                        this.updateForm(element);
                      }}
                    />
                  </div>
                </div>
                <FormField
                  id={"email"}
                  formdata={this.state.formdata.email}
                  change={(element) => {
                    this.updateForm(element);
                  }}
                />
                <h2>ACOOUNT INFORMATION</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      formdata={this.state.formdata.password}
                      change={(element) => {
                        this.updateForm(element);
                      }}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmpassword"}
                      formdata={this.state.formdata.confirmpassword}
                      change={(element) => {
                        this.updateForm(element);
                      }}
                    />
                  </div>
                </div>
                {this.state.formError ? (
                  <div className="error_label">Please check your data</div>
                ) : (
                  " "
                )}
                <SharedButton
                  onClick={this.submitForm}
                  title="Create an account"
                  addStyle={{
                    margin: "10px 0 0 0",
                    border: "none",
                    outline: "none",
                  }}
                />
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations</div>
            <div>You will be redirected within a seconds</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withRouter(Register));

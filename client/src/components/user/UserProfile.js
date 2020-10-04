import React, { Component } from "react";
import UserDashboardLayout from "./../shared/user/index";
import SharedButton from "./../shared/button";
import {
  update,
  generateData,
  isFormValid,
} from "./../shared/form/formActions";
import FormField from "./../shared/form/FormField";
import { connect } from "react-redux";
import { updateUserData } from "./../../redux/actions/userActions";
export class UserProfile extends Component {
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
    },
  };
  componentDidMount() {
    this.populateData();
  }
  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, "updateUser");
    this.setState({
      formError: false,
      formdata: newFormdate,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    console.log("sss");
    let dataToSubmit = generateData(this.state.formdata, "updateUser");
    let formIsValid = isFormValid(this.state.formdata, "updateUser");
    //   here we check if the form is valid and if true we get response of the action
    //   and then we push the user to dashboard
    //   if not valid we make form error true
    formIsValid
      ? this.props
          .dispatch(updateUserData(dataToSubmit))
          .then(() => {
            console.log(this.props);
            if (this.props.user.updateUser.success) {
              this.setState({ formSuccess: true });
            }
          })
          .then(() => {
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
          })
      : this.setState({ formError: true });
  };
  populateData = () => {
    const newFormData = this.state.formdata;
    for (const key in newFormData) {
      newFormData[key].value = this.props.user.userData[key];
      newFormData[key].valid = true;
      newFormData[key].touched = true;
      newFormData[key].validationMessage = "";
    }
    this.setState({
      formdata: newFormData,
    });
  };
  render() {
    return (
      <UserDashboardLayout>
        <h1>Profile</h1>
        <h2>Personal information</h2>
        <form onSubmit={this.submitForm}>
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
          {this.state.formSuccess && (
            <div className="form_success">Success</div>
          )}
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : (
            " "
          )}
          <SharedButton
            onClick={this.submitForm}
            title="Update data "
            addStyle={{
              margin: "10px 0 0 0",
              border: "none",
              outline: "none",
            }}
          />
        </form>
      </UserDashboardLayout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(UserProfile);

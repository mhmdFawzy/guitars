import React, { Component } from "react";
import UserDashboardLayout from "./../../shared/user/index";
import FormField from "./../../shared/form/FormField";
import {
  generateData,
  isFormValid,
  update,
  resetFormValues,
} from "./../../shared/form/formActions";
import SharedButton from "./../../shared/button";
import {
  getSiteData,
  updateSiteData,
} from "./../../../redux/actions/siteActions";
import { connect } from "react-redux";
export class SiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Please enter the site address",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working hours",
          name: "hours_input",
          type: "text",
          placeholder: "Please enter the working hours",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "hours_input",
          type: "text",
          placeholder: "Please enter the site phone",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Email",
          name: "email_input",
          type: "text",
          placeholder: "Please enter the site email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
    },
  };
  componentDidMount() {
    this.props.dispatch(getSiteData()).then((response) => {
      let newFormData = this.state.formdata;
      let siteData = response.payload[0];
      for (const key in siteData) {
        newFormData[key].value = siteData[key];
        newFormData[key].valid = true;
        newFormData[key].touched = true;
        newFormData[key].validationMessage = "";
      }
      this.setState({
        formdata: newFormData,
      });
    });
  }
  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, "addProduct");
    this.setState({
      formError: false,
      formdata: newFormdate,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "addProduct");
    let formIsValid = isFormValid(this.state.formdata, "addProduct");
    //   here we check if the form is valid and if true we get response of the action
    //   and then we push the user to dashboard
    //   if not valid we make form error true
    console.log(dataToSubmit);
    formIsValid
      ? this.props
          .dispatch(updateSiteData(dataToSubmit))
          .then(() => {
            this.setState({ formSuccess: true });
          })
          .then(() => {
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
          })
      : this.setState({ formError: true });
  };
  render() {
    return (
      <UserDashboardLayout>
        <h1>Site Information</h1>
        <form onSubmit={this.submitForm}>
          <FormField
            id={"address"}
            formdata={this.state.formdata.address}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"hours"}
            formdata={this.state.formdata.hours}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"phone"}
            formdata={this.state.formdata.phone}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          {this.state.formSuccess ? (
            <div className="form_success">Success</div>
          ) : null}
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : (
            " "
          )}
          <SharedButton
            onClick={this.submitForm}
            title="Update site information"
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
  return { siteData: state.siteInfo.siteData };
};
export default connect(mapStateToProps)(SiteInfo);

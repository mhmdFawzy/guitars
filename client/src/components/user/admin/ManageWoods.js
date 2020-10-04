import React, { Component } from "react";
import FormField from "./../../shared/form/FormField";
import SharedButton from "./../../shared/button";
import {
  generateData,
  isFormValid,
  update,
  resetFormValues,
} from "./../../shared/form/formActions";
import { getWoods } from "./../../../redux/actions/productActions";
import { addWood } from "./../../../redux/actions/categories";

import { connect } from "react-redux";

export class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Please enter the wood name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
      },
    },
  };
  componentDidMount() {
    if (!this.props.products.woods) {
      this.props.dispatch(getWoods());
    }
  }
  showWoods = (woods) => {
    return woods
      ? woods.map((wood) => (
          <div className="category_item" key={wood._id}>
            {wood.name}
          </div>
        ))
      : "";
  };
  updateForm = (element) => {
    const newFormdate = update(element, this.state.formdata, "addWood");
    this.setState({
      formError: false,
      formdata: newFormdate,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "addWood");
    let formIsValid = isFormValid(this.state.formdata, "addWood");
    //   here we check if the form is valid and if true we get response of the action
    //   and then we push the user to dashboard
    //   if not valid we make form error true
    this.props.products.woods.filter((item) => {
      if (item.name === this.state.formdata.name.value) {
        this.setState({ formError: true });
        return false;
      }
      return null;
    });
    formIsValid
      ? this.props
          .dispatch(addWood(dataToSubmit, this.props.products.woods))
          .then((response) => {
            if (response.payload.success) {
              resetFormValues(this.state.formdata, "addWood");
            } else {
              this.setState({
                formError: true,
              });
            }
          })
      : this.setState({ formError: true });
  };
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.props.products.woods &&
                this.showWoods(this.props.products.woods)}
            </div>
          </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => {
                  this.updateForm(element);
                }}
              />{" "}
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
                title="Add wood"
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
    );
  }
}
const mapStateToprops = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToprops)(ManageWoods);

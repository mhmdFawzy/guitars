import React, { Component } from "react";
import UserDashboardLayout from "./../../shared/user/index";
import FormField from "./../../shared/form/FormField";
import FileUpload from "./../../../utils/FileUpload";
import {
  generateData,
  isFormValid,
  update,
  resetFormValues,
} from "./../../shared/form/formActions";
import {
  getBrands,
  getWoods,
  addProduct,
  clearAddProductStata,
} from "./../../../redux/actions/productActions";
import SharedButton from "./../../shared/button";
import { connect } from "react-redux";
export class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Please enter the product name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Please enter the product description",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Price",
          name: "price_input",
          type: "bumber",
          placeholder: "Please enter the product number",
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Brand",
          name: "brand_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Avaliablity",
          name: "avaliable_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish",
          name: "publish",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      wood: {
        element: "select",
        value: "",
        config: {
          label: "Wood",
          name: "wood_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      frets: {
        element: "select",
        value: "",
        config: {
          label: "Frets",
          name: "frets_input",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touchec: false,
        validationMessage: "",
        showLabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        showLabel: false,
        validationMessage: "",
      },
    },
  };
  updateStateOption = (newStateOptions, formdataField) => {
    const newFormdata = this.state.formdata;
    const options = [];
    newStateOptions.map((option) => {
      options.push({ key: option._id, value: option.name });
      return newStateOptions;
    });
    newFormdata[formdataField].config.options = options;
    this.setState({
      formdata: newFormdata,
    });
  };
  componentDidMount() {
    // const newFormdata = this.state.formdata;
    if (!this.props.products.brand) {
      this.props.dispatch(getBrands()).then((response) => {
        this.updateStateOption(response.payload, "brand");
      });
    }
    if (!this.props.products.brand) {
      this.props.dispatch(getWoods()).then((response) => {
        this.updateStateOption(response.payload, "wood");
      });
    }
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
      ? this.props.dispatch(addProduct(dataToSubmit)).then(() => {
          if (this.props.products.addProduct.success) {
            const newFormData = resetFormValues(
              this.state.formdata,
              "addProduct"
            );
            this.setState({
              formdata: newFormData,
              formSuccess: true,
            });
            setTimeout(() => {
              this.setState({
                formSuccess: false,
              });
              this.props.dispatch(clearAddProductStata());
            }, 3000);
          } else {
            this.setState({ formError: true });
          }
        })
      : this.setState({ formError: true });
  };
  imageHandler = (images) => {
    const newFormData = { ...this.state.formdata };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;
    this.setState({
      formdata: newFormData,
    });
  };
  render() {
    return (
      <UserDashboardLayout>
        <h2>Add product</h2>
        <form onSubmit={this.submitForm}>
          <FileUpload
            imagesHandler={(images) => {
              this.imageHandler(images);
            }}
            reset={this.state.formSuccess}
          />
          <FormField
            id={"name"}
            formdata={this.state.formdata.name}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"description"}
            formdata={this.state.formdata.description}
            change={(element) => {
              this.updateForm(element);
            }}
          />{" "}
          <FormField
            id={"price"}
            formdata={this.state.formdata.price}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <div className="form_devider"></div>
          <FormField
            id={"brand"}
            formdata={this.state.formdata.brand}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"shipping"}
            formdata={this.state.formdata.shipping}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"available"}
            formdata={this.state.formdata.available}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <div className="form_devider"></div>
          <FormField
            id={"wood"}
            formdata={this.state.formdata.wood}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <FormField
            id={"frets"}
            formdata={this.state.formdata.frets}
            change={(element) => {
              this.updateForm(element);
            }}
          />
          <div className="form_devider"></div>
          <FormField
            id={"publish"}
            formdata={this.state.formdata.publish}
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
            title="Add product"
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
  return { products: state.products };
};
export default connect(mapStateToProps)(AddProduct);

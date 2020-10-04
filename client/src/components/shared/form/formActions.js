export const validate = (element, formdata = []) => {
  let error = [true, ""];
  if (element.validation.email) {
    const valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(element.value);
    const message = !valid ? "Email must be valid one" : "";
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = !valid ? "Paswword doesn't match" : "";
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = !valid ? "This field is required" : "";
    error = !valid ? [valid, message] : error;
  }
  return error;
};

export const update = (element, formdata, formname) => {
  //    here we make a copy of the formdata to change values in it
  const newFormdata = { ...formdata };
  // we get the element we want to check here form our new form data
  // id is passed with element
  const newElement = { ...newFormdata[element.id] };
  newElement.value = element.event.target.value;
  if (element.blur) {
    let validDate = validate(newElement, formdata);
    newElement.valid = validDate[0];
    newElement.validationMessage = validDate[1];
  }
  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;
  return newFormdata;
};
export const generateData = (formdata, formName) => {
  let dataToSubmit = {};
  for (const key in formdata) {
    dataToSubmit[key] = formdata[key].value;
  }
  return dataToSubmit;
};
export const isFormValid = (formdata, formName) => {
  let formIsValid = true;
  for (const key in formdata) {
    formIsValid = formdata[key].valid && formIsValid;
  }
  return formIsValid;
};
export const resetFormValues = (formData, formName) => {
  const newFormdata = { ...formData };

  for (const key in newFormdata) {
    if (key === "images") {
      newFormdata[key].value = [];
    } else {
      newFormdata[key].value = "";
    }
    newFormdata[key].validationMessage = "";
    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
  }
  return newFormdata;
};

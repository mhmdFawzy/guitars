import React from "react";

function FormField({ id, formdata, change }) {
  const showError = () => {
    let errorMessage = "";
    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }
    return errorMessage;
  };
  const generateField = () => {
    let template = "";
    switch (formdata.element) {
      case "input":
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => {
                change({ event, id, blur: true });
              }}
              onChange={(event) => {
                change({ event, id });
              }}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => {
                change({ event, id, blur: true });
              }}
              onChange={(event) => {
                change({ event, id });
              }}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        template = (
          <div className="formBlock">
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <select
              {...formdata.config}
              onBlur={(event) => {
                change({ event, id, blur: true });
              }}
              onChange={(event) => {
                change({ event, id });
              }}
            >
              {<option value="">Select {formdata.config.label}</option>}
              {formdata.config.options.map((selector) => (
                <option key={selector.key} value={selector.key}>
                  {selector.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        return template;
    }
    return template;
  };
  return <div>{generateField()}</div>;
}

export default FormField;

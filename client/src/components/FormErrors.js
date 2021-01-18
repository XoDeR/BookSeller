import React from "react";
import { Alert } from "antd";

const FormErrors = ({ formErrors }) => (
  <Alert
    // message="Error"
    description={Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>
            {fieldName} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
    type="error"
  />
);
export default FormErrors;
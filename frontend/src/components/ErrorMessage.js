import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <>
      <Alert style={{ fontSize: 20 }} variant={variant}>
        {/* <strong>INVALID EMAIL OR PASSWORD</strong> */}
        <strong>{children}</strong>
      </Alert>
    </>
  );
};

export default ErrorMessage;

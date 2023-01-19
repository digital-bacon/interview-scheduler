import React from "react";
import PropTypes from "prop-types";

const Error = ({ message, onClose, ...props }) => {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        onClick={onClose}
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Error;

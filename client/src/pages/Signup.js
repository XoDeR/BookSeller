import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { NavLink } from "react-router-dom";

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required.";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required.";
  }

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be atleast 6 characters long.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords do not match";
  }

  return errors;
};

class Signup extends React.Component {
  processForm = values => {
    return fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.success) {
          localStorage.setItem("successMessage", response.message);
          this.props.history.push("/login");
        }
        throw new SubmissionError({
          _errors: `${response.message} : ${response.errors}`
        });
      });
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className="form-group">
      <label>{label}</label>
      <div>
        <input
          {...input}
          placeholder={label}
          className="form-control"
          type={type}
        />
        {touched && error && <span>{error}</span>}
      </div>
    </fieldset>
  );

  renderErrorMessage = ({ meta: { error } }) => {
    return <div>{error && <span>{error}</span>}</div>;
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h3 className="text-center">New User? Sign Up to continue</h3>
          <form onSubmit={this.props.handleSubmit(this.processForm)}>
            <Field
              name="firstName"
              type="text"
              component={this.renderField}
              label="First name"
            />
            <Field
              name="lastName"
              type="text"
              component={this.renderField}
              label="Last name"
            />
            <Field
              name="email"
              type="text"
              component={this.renderField}
              label="Email"
            />
            <Field
              name="password"
              type="password"
              component={this.renderField}
              label="Password"
            />
            <Field
              name="passwordConfirmation"
              type="password"
              component={this.renderField}
              label="Password confirmation"
            />
            <Field name="_errors" component={this.renderErrorMessage} />
            <br />
            <button action="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
          <br />
          <NavLink to="/login">Already have an account? Log in.</NavLink>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "signup",
  validate
})(Signup);
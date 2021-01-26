import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Redirect, NavLink } from "react-router-dom";

import Auth from "../modules/Auth";
import * as UserActions from "../actions/user";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem("successMessage");
    let successMessage = "";

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem("successMessage");
    }

    this.state = {
      errors: {},
      successMessage,
      redirectToReferrer: false
    };
  }

  processForm = values => {
    return fetch("/auth/login", {
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
        this.setState({
          errors: {}
        });
        if (response.success) {
          this.props.userActions.saveUserName(response.user);
          Auth.authenticateUser(response.token);
          this.setState({ redirectToReferrer: true });
        }
        throw new SubmissionError({
          _errors: `${response.message}`
        });
      });
  };

  renderErrorMessage = ({ meta: { error } }) => {
    return <div>{error && <span>{error}</span>}</div>;
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h3 className="text-center">
            Already have an account? Please Sign in
          </h3>
          <form onSubmit={this.props.handleSubmit(this.processForm)}>
            <fieldset className="form-group">
              <label>Email</label>
              <Field
                name="email"
                component="input"
                className="form-control"
                type="text"
                placeholder="Email"
              />
            </fieldset>

            <fieldset className="form-group">
              <label>Password</label>
              <Field
                name="password"
                component="input"
                className="form-control"
                type="password"
                placeholder="Password"
              />
              <Field name="_errors" component={this.renderErrorMessage} />
            </fieldset>

            <button action="submit" className="btn btn-primary">
              Sign In
            </button>
            <br />
            <NavLink to="/signup">New user? Sign Up</NavLink>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

Login = connect(null, mapDispatchToProps)(Login);

export default reduxForm({
  form: "login"
})(Login);
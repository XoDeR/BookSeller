import React from "react";
import PropTypes from "prop-types";
import Auth from "../modules/Auth";
import { connect } from "react-redux";
import * as UserActions from "../actions/user";
import { bindActionCreators } from "redux";

class LogoutFunction extends React.Component {
  componentDidMount() {
    Auth.deauthenticateUser();
    this.props.userActions.userLogout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    );
  }
}

LogoutFunction.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LogoutFunction);
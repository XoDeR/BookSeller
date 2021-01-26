import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const Nav = styled.div`
  width: 100%;
  height: 50px;
  background-color: #108ee8;
  display: flex;
  font-size: 120%;
  justify-content: flex-start;
`;

const Logo = styled.div`
  flex: 3;
  color: #fff;
  align-self: center;
`;

const linkStyle = {
  flex: "1",
  color: "#fff",
  alignSelf: "center"
};

const PrimaryHeader = ({ user, cartItems }) => (
  <Nav>
    <Logo>
      Welcome to our Bookstore!
      {user.userData ? user.userData.lastName : ""}
    </Logo>
    <NavLink to="/" exact style={linkStyle}>
      Home
    </NavLink>
    <NavLink to="/cart" style={linkStyle}>
      Cart({cartItems.length})
    </NavLink>
    {user.isAdmin && (
      <NavLink to="/app" style={linkStyle}>
        App
      </NavLink>
    )}
    {user.isLoggedIn ? (
      <NavLink to="/logout" style={linkStyle}>
        Logout
      </NavLink>
    ) : (
      <NavLink to="/login" style={linkStyle}>
        Login
      </NavLink>
    )}
  </Nav>
);

function mapStateToProps(state) {
  return {
    user: state.user,
    cartItems: state.cartItems
  };
}

export default connect(mapStateToProps)(PrimaryHeader);
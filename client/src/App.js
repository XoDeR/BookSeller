import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import PrimaryHeader from "./ui/PrimaryHeader";
import BooksTable from "./pages/BooksTable";
import BooksOrder from "./pages/BooksOrder";
import BooksCart from "./pages/BooksCart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FourOhFour from "./pages/FourOhFour";
import LogoutFunction from "./pages/LogoutFunction";
import Auth from "./modules/Auth";
import { connect } from "react-redux";
import AddressPage from "./pages/AddressPage";
import AddAddressForm from "./components/AddAddressForm";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <main>
              <PrimaryHeader />
              <Switch>
                <Route path="/" exact component={BooksOrder} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/cart" exact component={BooksCart} />
                <Route
                  path="/app"
                  component={this.props.isAdmin ? BooksTable : FourOhFour}
                />
                <PrivateRoute
                  path="/checkout/address/add"
                  component={AddAddressForm}
                />
                <PrivateRoute
                  path="/checkout/address"
                  component={AddressPage}
                />
                <PrivateRoute path="/checkout/pay" component={Checkout} />

                <Route path="/logout" component={LogoutFunction} />
                <Route path="/404" component={FourOhFour} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAdmin: state.user.isAdmin
  };
}

export default connect(mapStateToProps)(App);
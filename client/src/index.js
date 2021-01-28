import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { StripeProvider } from "react-stripe-elements";
import configureStore from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_51IDaPbEcQoHsXCCFxRaEmWNrxHvwDSb35a87kkQPoE1Zm4y9zD8eFzRH1pybLdkxIXoLeUA4orIq0YCGmSOs6chn00eUN18ItV">
      <App />
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import ReduxPromise from "redux-promise";

export default function configureStore() {
  let initState = {};
  const persistedState = localStorage.getItem("reduxState");

  if (persistedState) {
    initState = JSON.parse(persistedState);
  }

  const store = createStore(
    rootReducer,
    initState,
    compose(
      applyMiddleware(ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
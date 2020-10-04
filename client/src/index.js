import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./Resources/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

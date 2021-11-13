import React from "react";
import { render } from "react-dom";
import "./styles/globals.css";
import App from "./App";
import AppProviders from "./AppProviders";

const rootElement = document.getElementById("root");
render(
  <AppProviders>
      <App />
  </AppProviders>,
  rootElement
);

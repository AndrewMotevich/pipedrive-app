import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Link } from "react-router-dom";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,

  <BrowserRouter>
    <App />
  </BrowserRouter>
);

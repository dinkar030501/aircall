import React from "react";

import ReactDOM from "react-dom/client";

import "./css/body.css";
import "./css/app.css";
import "./css/header.css";
import "./css/activityListItem.css";
import "./css/activityList.css";
import "./css/callDetailsContainer.css";
import "./css/ShimmerUI.css";

import App from "./App.jsx";

const appElement = document.getElementById("app");

const root = ReactDOM.createRoot(appElement);
root.render(<App />);

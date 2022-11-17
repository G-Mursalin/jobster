// React
import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import "./index.css";
// Component
import App from "./App";
//React toolkit
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

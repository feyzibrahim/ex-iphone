import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={`628424458787-qkhchkq95n7ht13oneer3692talfp63f.apps.googleusercontent.com`}
      >
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

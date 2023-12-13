import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-day-picker/dist/style.css";
import "react-image-crop/dist/ReactCrop.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { GOOGLE_ID } from "./Common/configurations.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={`${GOOGLE_ID}`}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

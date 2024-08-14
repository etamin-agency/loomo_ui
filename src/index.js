import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app/App";
import store from "./store";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);

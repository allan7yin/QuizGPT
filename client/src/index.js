import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-w5ogvkwglktdnp2m.us.auth0.com"
      clientId="0dfvdORx076LBUisN9JcW08AXWNfMevD"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-w5ogvkwglktdnp2m.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

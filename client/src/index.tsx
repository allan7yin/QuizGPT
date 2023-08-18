import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-w5ogvkwglktdnp2m.us.auth0.com"
      clientId="0dfvdORx076LBUisN9JcW08AXWNfMevD"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:8080/api/v1",
        scope:
          "read:current_user update:current_user_metadata read:quiz create:quiz read:messages",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

reportWebVitals();

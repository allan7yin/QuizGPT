import { auth } from "express-oauth2-jwt-bearer";

export const auth0JwtMiddleware = auth({
  audience: "http://localhost:8080/api/v1",
  issuerBaseURL: "https://dev-w5ogvkwglktdnp2m.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

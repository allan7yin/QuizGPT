import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

export const auth0JwtMiddleware = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: process.env.AUTH0_ISSUER!,
  tokenSigningAlg: process.env.AUTH0_SIGNATURE_ALGORITHM!,
});

import axios from "axios";
import jwt, { VerifyOptions } from "jsonwebtoken";

async function validateAuth0Token(token: string) {
  try {
    // Fetch JWKS (JSON Web Key Set) from Auth0
    const jwksUrl =
      "https://dev-w5ogvkwglktdnp2m.us.auth0.com/.well-known/jwks.json";
    const jwksResponse = await axios.get(jwksUrl);
    const jwks = jwksResponse.data.keys;

    // Decode the token to get the kid (key ID)
    const decodedToken = jwt.decode(token, { complete: true });
    const { kid } = decodedToken!.header;
    const jwk = jwks.find(
      (key: { kid: string | undefined }) => key.kid === kid
    );

    if (!jwk) {
      throw new Error("Key not found in JWKS");
    }

    // Construct the options for jwt.verify
    const publicKey = certToPEM(jwk.x5c[0]);
    const options: VerifyOptions = {
      audience: process.env.AUTH0_AUDIENCE!,
      issuer: process.env.AUTH0_ISSUER!,
      algorithms: ["RS256"],
    };

    // Verify the token using the provided public key and options
    const verifiedToken = jwt.verify(token, publicKey, options) as {
      sub: string;
    };

    return verifiedToken.sub;
  } catch (error) {
    throw new Error("Token verification failed: " + error);
  }
}

function certToPEM(cert: string) {
  return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`;
}

export default validateAuth0Token;

import { Express } from "express"; // Assuming you're using Express
import { createProxyMiddleware } from "http-proxy-middleware";

export default function configureProxy(app: Express) {
  app.use(
    "/api", // Your backend API base URL path
    createProxyMiddleware({
      target: "http://localhost:8080", // Your backend URL
      changeOrigin: true,
    })
  );
}

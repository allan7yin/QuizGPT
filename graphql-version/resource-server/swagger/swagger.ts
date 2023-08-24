import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerSpec = YAML.load("./swagger/swagger.yaml");

const swaggerDocs = (app: Express, port: number) => {
  // swagger page
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );

  // Docs in JSON Format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("content-type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;

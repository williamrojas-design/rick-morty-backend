import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rick and Morty API Backend",
      version: "1.0.0",
      description: "API para gestionar usuarios y favoritos de Rick and Morty",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de Desarrollo",
      },
    ],
  },

  apis: ["./src/routes/*.ts", "./src/index.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);
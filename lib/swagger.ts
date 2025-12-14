import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Job Portal",
        version: "1.0.0",
        description:
          "API documentation for the Talent Loop, providing endpoints for user authentication, university management, country data, and service offerings.",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "https://your-production-domain.com",
          description: "Production server",
        },
      ],
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "token",
            description: "JWT token stored in HTTP-only cookie",
          },
        },
      },
      security: [
        {
          cookieAuth: [],
        },
      ],
      tags: [
        {
          name: "Authentication",
          description: "User authentication and authorization API endpoints",
        },
        {
          name: "Admin",
          description: "Admin related endpoints",
        },
        {
          name: "Frontend",
          description: "Frontend related endpoints",
        },
      ],
    },
  });
  return spec
}
import Fastify from "fastify";
import serverless from "serverless-http";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import helmet from "@fastify/helmet";

import form from "./routes/form.js";
import clerk from "./routes/clerk.js";

const fastify = Fastify({
	logger: true,
});

await fastify.register(fastifySwagger, {
	transform: jsonSchemaTransform,
});
await fastify.register(fastifySwaggerUi, {
	routePrefix: "/api/docs",
});

fastify.register(helmet);

fastify.register(form, { prefix: "/api" });
fastify.register(clerk, { prefix: "/api" });

await fastify.ready();
fastify.swagger();

fastify.listen({ port: 3000 }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
export const handler = serverless(fastify);

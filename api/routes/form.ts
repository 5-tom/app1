import fastifyMultipart from "@fastify/multipart";
import "dotenv/config";
import { clerkPlugin, getAuth } from "@clerk/fastify";

import {
	serializerCompiler,
	validatorCompiler,
	// ZodTypeProvider
} from "fastify-type-provider-zod";
import z from "zod";

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import dbConnector from "../our-db-connector.js";

const FORM_SCHEMA = z.object({ email: z.string().email() });

const opts = {
	schema: {
		consumes: ["multipart/form-data"],
		body: FORM_SCHEMA,
	},
	preValidation: (req: FastifyRequest, reply: FastifyReply, done) => {
		const auth = getAuth(req);
		if (!auth.userId) {
			return reply.code(403).send();
		}
		done();
	},
};

async function routes(fastify: FastifyInstance) {
	fastify.register(dbConnector);

	fastify.register(fastifyMultipart, { attachFieldsToBody: "keyValues" });

	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);

	fastify.register(clerkPlugin, { hookName: "onRequest" });
	fastify.post("/form", opts, async (req, reply) => {
		const collection = fastify.mongo.db.collection("test_collection");
		const result = await collection.insertOne({ email: req.body.email });
		return result;
	});
}

export default routes;

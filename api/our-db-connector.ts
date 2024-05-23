import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

import type { FastifyInstance } from "fastify";

async function dbConnector(fastify: FastifyInstance) {
	fastify.register(fastifyMongo, {
		url: "mongodb://root:example@localhost:27017/test_database?authSource=admin"
		//url: process.env.DATABASE_URL
	});
}

export default fastifyPlugin(dbConnector);

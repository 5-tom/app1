#!/bin/bash
#https://dev.to/renzhamin/setup-mongodb-replica-set-locally-in-docker-or-with-atlas-for-prisma-orm-54gp
podman stop $(podman ps -a -q)
podman rm $(podman ps -a -q)
podman run --name mongo \
	-p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME="monty" \
	-e MONGO_INITDB_ROOT_PASSWORD="pass" \
	-d docker.io/prismagraphql/mongo-single-replica:5.0.3

#-d --becomes--> -it to debug
#4.0-bionic
#4.2.17-bionic
#4.4.3-bionic
#5.0.3

#podman exec -it mongo bash
#mongosh "mongodb://monty:pass@localhost:27017/db_name?authSource=admin&directConnection=true"
#podman container ls -a

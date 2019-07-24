#!/bin/bash
set -euxo pipefail

cd ./movie-rating-database
docker build -t movie-rating/database:0.1 .
docker run --rm -p 27017:27017 -e MONGO_INITDB_DATABASE=movies -d movie-rating/database:0.1 &
cd ../movie-rating-client
docker build -t movie-rating/client:0.1 .
docker run --rm -p 80:80 -d movie-rating/client:0.1 &
cd ../movie-rating-server
mvn clean spring-boot:run & 


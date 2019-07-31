#!/bin/bash
set -euxo pipefail

cd ./movie-rating-server
mvn clean package
cd .. 

docker-compose up

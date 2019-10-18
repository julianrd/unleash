#!/bin/bash

docker build -t zoopix-unleash:0.0.2 .
docker run -e DATABASE_URL=postgres://stgzoopix:iL96rMyDbJ2K07fe@zoopix-unleash-staging.cu4pykprepda.us-west-2.rds.amazonaws.com:5432/unleash -e PORT=80 -e BASE_URI_PATH=/unleash  -p 80:80 zoopix-unleash:0.0.2 
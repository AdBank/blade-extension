#!/bin/bash

docker run -it -d --name blade blade

docker exec blade npm run prod

docker cp blade:/app/blade.zip .

docker cp blade:/app/devenv.chrome .

docker stop blade && docker rm blade && docker rmi blade


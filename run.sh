#!/bin/bash

docker run -it -d --name blade blade /bin/bash

docker cp blade:/app/blade.zip .

docker stop blade && docker rm blade && docker rmi blade


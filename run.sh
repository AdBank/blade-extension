#!/bin/bash

docker run -it -d --name blade blade /bin/bash

docker cp blade:/blade.zip .

docker stop blade && docker rm blade


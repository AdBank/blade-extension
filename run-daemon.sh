#!/bin/bash

STRING_MATCHER_START="URL = \""
STRING_MATCHER_END="\";"
PROD_URL=$1
PATH_TO_FILE_WITH_URL="./bladeui/js/utils/request.js"

docker run -it -d --name blade blade

if [[ ! -z $PROD_URL ]]; then
  docker exec blade sed -i 's|'"$STRING_MATCHER_START"'.*'"$STRING_MATCHER_END"'|'"$STRING_MATCHER_START$PROD_URL$STRING_MATCHER_END"'|' $PATH_TO_FILE_WITH_URL
fi

docker exec blade npm i

docker exec blade npm run prod

docker cp blade:/app/blade.zip .

docker cp blade:/app/devenv.chrome .

docker stop blade && docker rm blade && docker rmi blade
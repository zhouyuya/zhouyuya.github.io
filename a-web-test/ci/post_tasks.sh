#!/bin/bash

PRODUCT=around
PROJECT=a-web
PROJECT_PROD=a-web-prod

UPLOAD_UTILITY=/data/utility/index.js
UPDATE_UTILITY=/data/utility/updateWeb.js

BUILDTIME=$(date "+%Y%m%d.%H%M%S")
VERSION=1.0.1

# Step1 制作ci包
tar cvfz /data/temp/${PROJECT}-${VERSION}.${BUILDTIME}.tar.gz --exclude=node_modules --exclude=.git --exclude=.idea --exclude=ci -C .. .
node ${UPLOAD_UTILITY} ${PRODUCT} ${PROJECT} /data/temp/${PROJECT}-${VERSION}.${BUILDTIME}.tar.gz
node ${UPDATE_UTILITY} ${PRODUCT} ${PROJECT}
rm -fr /data/temp/${PROJECT}-${VERSION}.${BUILDTIME}.tar.gz

# Step2 制作prod包
for i in $(find .. \( -path ./.git -o -path ./.idea -o -path ./ci \) -prune -o -type f -print)
do
  sed -i 's/www.ci.aroundworld.cn/www.aroundworld.cn/g' $i
done
tar cvfz /data/temp/${PROJECT_PROD}-${VERSION}.${BUILDTIME}.tar.gz --exclude=node_modules --exclude=.git --exclude=.idea --exclude=ci -C .. .
node ${UPLOAD_UTILITY} ${PRODUCT} ${PROJECT_PROD} /data/temp/${PROJECT_PROD}-${VERSION}.${BUILDTIME}.tar.gz
rm -fr /data/temp/${PROJECT_PROD}-${VERSION}.${BUILDTIME}.tar.gz

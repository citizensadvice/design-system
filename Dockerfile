FROM node:12-alpine

ENV LANG en_US.UTF-8

USER root

RUN adduser jenkins -u 500 -D && addgroup jenkins users

RUN apk add docker lxc ruby && gem install bundler

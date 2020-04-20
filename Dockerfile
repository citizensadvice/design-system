FROM node:12-alpine

ENV LANG en_US.UTF-8

USER root

RUN apk add openrc && apk add docker && apk add ruby && gem install bundler


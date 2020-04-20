FROM node:12-alpine

ENV LANG en_US.UTF-8

USER root

RUN apk add ruby

RUN gem install bundler

FROM node:12-alpine

# Install dockerize so that we can wait for hubs to be up
RUN apk update && apk add wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Standard Ruby Packages
RUN apk upgrade && apk add --upgrade ruby git make

# nokogiri compilation (C-gem)
RUN apk add gcc libc-dev libxslt-dev libxml2-dev ruby-dev zlib-dev build-base

# Cross-compatibility fix for Alpine Images and JSON files
RUN apk add ruby-json

RUN gem install bundler -v '2.1.4'

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle config --global silence_root_warning 1 && bundle install

COPY package*.json /tmp/

RUN cd /tmp && npm install --loglevel error

RUN mkdir -p /app && cp -a /tmp/node_modules /app

COPY . /app

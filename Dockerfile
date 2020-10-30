FROM node:14-alpine

RUN apk update && apk upgrade

# Install dockerize so that we can wait for hubs to be up
RUN apk add wget
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Ruby Packages
RUN apk add --upgrade ruby ruby-dev ruby-json ruby-etc

# nokogiri compilation (C-gem)
RUN apk add gcc libc-dev libxslt-dev libxml2-dev zlib-dev build-base

# required for activesupport v6
RUN apk add ruby-bigdecimal

# git for repository-based gems
RUN apk add --no-cache git

# Install latest bundler
RUN gem install bundler -v '2.1.4'

WORKDIR /app

COPY package*.json /tmp/

RUN cd /tmp && npm ci --loglevel error

RUN mkdir -p /app && cp -a /tmp/node_modules /app

COPY . /app

RUN bundle config --local build.nokogiri --use-system-libraries bundle config build.nokogiri --with-xml2-dir=/usr/include/libxml2 --with-xslt-dir=/usr/include/libxslt \
  && bundle install

RUN npm run docs:build

RUN npm run build

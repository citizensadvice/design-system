FROM node:12-alpine

# For Standard Ruby Packages
RUN apk update \
    && apk upgrade \
    && apk add --upgrade ruby git make

# Specifically for nokogiri compilation (C-gem)
RUN apk add gcc libc-dev libxslt libxslt-dev libxml2-dev patch ruby-dev
RUN apk add zlib-dev xz-dev build-base

RUN gem install bundler -v '2.1.4'

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle config --global silence_root_warning 1 && bundle install

COPY package*.json /tmp/

RUN cd /tmp && npm install --loglevel error

RUN mkdir -p /app && cp -a /tmp/node_modules /app

COPY . /app

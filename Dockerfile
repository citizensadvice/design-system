FROM node:12-alpine

RUN apk add ruby

RUN gem install bundler

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle config --global silence_root_warning 1 && bundle install

COPY package*.json /tmp/

RUN cd /tmp && npm install --loglevel error

RUN mkdir -p /app && cp -a /tmp/node_modules /app

COPY . /app

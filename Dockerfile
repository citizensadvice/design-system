FROM node:12-alpine

RUN apk add ruby

RUN gem install bundler

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle config --global silence_root_warning 1 && bundle install

COPY package.json /app/

COPY testing/package.json /app/testing/

RUN npm i --quiet

COPY . /app

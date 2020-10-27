FROM ruby:2.6-alpine as build

ENV BUNDLER_VERSION 2.1.4

RUN apk add --no-cache --update build-base git

RUN mkdir -p /app
COPY Gemfile* /app/
WORKDIR /app

ENV LANG=C.UTF-8 \
    BUNDLE_JOBS=6 \
    BUNDLE_RETRY=3

RUN bundle install && gem cleanup

FROM ruby:2.6-alpine AS ruby

WORKDIR /app

RUN apk add --no-cache --update jq wait-for

COPY --from=build /usr/local /usr/local

COPY . /app

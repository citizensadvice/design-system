FROM docker:dind

ENV LANG en_US.UTF-8

USER root

RUN adduser jenkins -u 500 -D && addgroup jenkins users

RUN apk add nodejs npm ruby && gem install bundler

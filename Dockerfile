FROM ruby:2.6.5

ENV NODE_MAJOR_VERSION 12

RUN curl --retry 5 --retry-connrefuse --retry-delay 4 -sL https://deb.nodesource.com/setup_$NODE_MAJOR_VERSION.x | bash - && \
  apt-get install -y nodejs inotify-tools && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  truncate -s 0 /var/log/*log

# Install dockerize so that we can wait for hubs to be up
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Standard Ruby Packages
RUN apt-get upgrade -y && apt-get install git make

# nokogiri compilation (C-gem)
RUN apt-get install -y gcc libc-dev libxslt-dev libxml2-dev ruby-dev zlib1g-dev build-essential

# Cross-compatibility fix for Alpine Images and JSON files
RUN apt-get install -y ruby-json

RUN gem install bundler -v '2.1.4'

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle config --global silence_root_warning 1 && bundle install

COPY package*.json /tmp/

RUN cd /tmp && npm install --loglevel error

RUN mkdir -p /app && cp -a /tmp/node_modules /app

COPY . /app

FROM ruby:2.6.5

ENV NODE_MAJOR_VERSION 12

RUN curl --retry 5 --retry-connrefuse --retry-delay 4 -sL https://deb.nodesource.com/setup_$NODE_MAJOR_VERSION.x | bash - && \
  apt-get install -y nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  truncate -s 0 /var/log/*log

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales

RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
  dpkg-reconfigure --frontend=noninteractive locales && \
  update-locale LANG=en_US.UTF-8

ENV LANG en_US.UTF-8

RUN gem install bundler

RUN bundle config --global frozen 1

COPY Gemfile Gemfile.lock ./

RUN bundle config mirror.https://rubygems.org https://nexus.devops.citizensadvice.org.uk/repository/rubygems-proxy && \
  bundle config mirror.https://rubygems.org.fallback_timeout 1

RUN bundle install -j6

ADD package*.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app

WORKDIR /app
ADD . /app/

RUN groupadd ruby -g 3000 \
  && useradd -m -d /home/ruby -u 3000 --no-user-group ruby \
  && usermod -g ruby ruby

RUN chmod -R 755 /app/haml

USER ruby

FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev
RUN mkdir /db
RUN /usr/bin/sqlite3 /db/trendstweet.db

EXPOSE 8080
CMD bash
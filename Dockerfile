FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

CMD bash
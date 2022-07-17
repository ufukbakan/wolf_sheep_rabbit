FROM ubuntu:18.04
COPY . /
WORKDIR /
RUN apt update
RUN apt install apt-transport-https ca-certificates curl software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
RUN apt update
RUN apt install docker-ce
RUN systemctl status docker
RUN apt-get install docker-compose-plugin
RUN docker compose up -d
# FROM postgres:13.6-alpine
# WORKDIR /
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD=postgres
# COPY ./initdb.sql /docker-entrypoint-initdb.d/db_init.sql
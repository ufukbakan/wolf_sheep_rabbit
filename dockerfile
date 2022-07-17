FROM ubuntu:18.04
COPY . /
WORKDIR /
RUN sudo apt update
RUN sudo apt install apt-transport-https ca-certificates curl software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
RUN sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
RUN sudo apt update
RUN sudo apt install docker-ce
RUN sudo systemctl status docker
RUN sudo apt-get install docker-compose-plugin
RUN docker compose up -d
# FROM postgres:13.6-alpine
# WORKDIR /
# ENV POSTGRES_USER postgres
# ENV POSTGRES_PASSWORD=postgres
# COPY ./initdb.sql /docker-entrypoint-initdb.d/db_init.sql
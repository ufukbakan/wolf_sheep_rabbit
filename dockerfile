FROM ubuntu:18.04
COPY . /
WORKDIR /
RUN apt update -y
RUN apt install apt-transport-https ca-certificates curl software-properties-common -y
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
RUN apt update -y
RUN apt install docker-ce -y
# RUN systemctl status docker
RUN apt-get install docker-compose-plugin -y
RUN service docker restart && docker compose up -d
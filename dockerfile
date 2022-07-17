FROM postgres:13.6-alpine
WORKDIR /
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD=postgres
COPY ./initdb.sql /docker-entrypoint-initdb.d/db_init.sql
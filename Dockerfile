FROM node:9 AS node
WORKDIR /src/client
COPY client .
RUN yarn install && yarn build

FROM gradle:4.9-jdk8-alpine as java
USER root
RUN pwd
COPY . .
COPY --from=node /src/client/build/ src/main/resources/public/
RUN gradle --no-daemon build
RUN ls -l build/libs

FROM openjdk:8-jre-alpine
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-*.jar /data/app.jar
CMD ["java", "-jar", "/data/app.jar"]

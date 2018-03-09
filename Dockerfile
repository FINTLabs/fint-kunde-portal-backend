FROM node:9-alpine AS node
WORKDIR /src/client
COPY client .
RUN yarn install && npm rebuild node-sass && yarn build
RUN ls -l

FROM gradle:jdk8-alpine as java
USER root
COPY . .
COPY --from=node /src/client/dist/ src/main/resources/public/
RUN gradle --no-daemon build

FROM openjdk:8-jre-alpine
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-backend*.jar /data/app.jar
CMD ["java", "-jar", "/data/app.jar"]

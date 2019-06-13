FROM fintlabs.azurecr.io/kunde-portal-frontend:latest as client

FROM gradle:4.10.3-jdk8-alpine as java
USER root
COPY . .
COPY --from=client /src/build/ src/main/resources/public/
RUN gradle --no-daemon build

FROM openjdk:8-jre-alpine
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-*.jar /data/app.jar
CMD ["java", "-jar", "/data/app.jar"]

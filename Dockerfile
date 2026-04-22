FROM eclipse-temurin:17-jdk-alpine as java
WORKDIR /home/gradle/src
COPY . .
RUN ./gradlew --no-daemon build

FROM gcr.io/distroless/java17
ENV JAVA_TOOL_OPTIONS="-XX:+ExitOnOutOfMemoryError"
COPY --from=java /home/gradle/src/build/libs/fint-kunde-portal-*.jar /data/fint-kunde-portal.jar
CMD ["/data/fint-kunde-portal.jar"]

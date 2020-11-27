FROM gradle:4.10.3-jdk8-alpine as java
USER root
COPY . .
RUN gradle --no-daemon build

FROM gcr.io/distroless/java:8
ENV JAVA_TOOL_OPTIONS -XX:+ExitOnOutOfMemoryError
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-*.jar /data/fint-kunde-portal.jar
CMD ["/data/fint-kunde-portal.jar"]

FROM gradle:7.3-jdk17-alpine as java
USER root
COPY . .
RUN gradle --no-daemon build

FROM gcr.io/distroless/java17
ENV JAVA_TOOL_OPTIONS -XX:+ExitOnOutOfMemoryError
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-*.jar /data/fint-kunde-portal.jar
CMD ["/data/fint-kunde-portal.jar"]

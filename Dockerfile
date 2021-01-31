FROM gradle:6.7.1-jdk11-openj9 as java
USER root
COPY . .
RUN gradle --no-daemon build

FROM gcr.io/distroless/java:11
ENV JAVA_TOOL_OPTIONS -XX:+ExitOnOutOfMemoryError
COPY --from=java /home/gradle/build/libs/fint-kunde-portal-*.jar /data/fint-kunde-portal.jar
CMD ["/data/fint-kunde-portal.jar"]

FROM eclipse-temurin:25-jdk-alpine as java
WORKDIR /home/gradle/src
COPY . .
RUN ./gradlew --no-daemon build

FROM eclipse-temurin:25-jre
ENV JAVA_TOOL_OPTIONS="-XX:+ExitOnOutOfMemoryError"
COPY --from=java /home/gradle/src/build/libs/fint-kunde-portal-*.jar /data/fint-kunde-portal.jar
ENTRYPOINT ["java", "-jar", "/data/fint-kunde-portal.jar"]

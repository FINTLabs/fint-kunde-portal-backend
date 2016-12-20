FROM java:8

LABEL authors="Frode Sjovatsen <frode@fintprosjektet.no>, Øystein Amundsen <oystein@fintprosjektet.no>"

ADD ./fint-kunde-portal-backend/build/libs/fint-kunde-portal-backend*.jar /data/app.jar

ENTRYPOINT java ${PARAMS} -jar /data/app.jar

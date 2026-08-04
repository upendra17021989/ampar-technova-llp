FROM maven:3.9.11-eclipse-temurin-17 AS build

WORKDIR /workspace

COPY pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests clean package

FROM eclipse-temurin:17-jre-jammy AS runtime

RUN groupadd --system --gid 10001 ampar \
    && useradd --system --uid 10001 --gid ampar --home-dir /app --shell /usr/sbin/nologin ampar

WORKDIR /app

COPY --from=build --chown=ampar:ampar /workspace/target/api-0.1.0-SNAPSHOT.jar /app/ampar-api.jar

USER 10001:10001

EXPOSE 8080

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0 -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom"

ENTRYPOINT ["java", "-jar", "/app/ampar-api.jar"]

#!/usr/bin/env bash

# Everything that ends up in the Docker image. A commit that touches none of
# these does not change the application: CI skips the Gradle check and CD
# reuses the image that is already in GHCR instead of building a new one.
APP_PATHS="src build.gradle settings.gradle gradle.properties gradle gradlew gradlew.bat Dockerfile"

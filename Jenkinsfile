#!groovy

node {
  currentBuild.result = "SUCCESS"

  properties([parameters([string(defaultValue: 'default', description: 'If this is set to other than `default`, it will trigger a force npm install of the fint-shared-components module.', name: 'RUN_TYPE')])])

  env.DOCKER_PORT      = (env.BRANCH_NAME == 'master') ? 8093 : 10093;
  env.DOCKER_CONTAINER = (env.BRANCH_NAME == 'master') ? "fint-kunde-portal" : "fint-kunde-portal_${env.BRANCH_NAME}"
  sh "echo Building branch: ${env.BRANCH_NAME} to ${env.DOCKER_CONTAINER}:${env.DOCKER_PORT}"

  try {
    stage('checkout') {
      checkout scm
    }

    stage('build') {
      if (env.RUN_TYPE != 'default') {
        // Remove entire node_modules folder and reinstall everything if RUN_TYPE is anything but 'default'
        sh 'rm -rf fint-kunde-portal-frontend/node_modules'
      }
      sh 'chmod +x gradlew'
      sh "./gradlew"
    }

    stage('deploy') {
      sh 'chmod +x docker-build'
      withCredentials([string(credentialsId: 'kundePortalRunParams', variable: 'runParams')]) {
        // available as an env variable, but will be masked if you try to print it out any which way
        sh 'sudo -E sh ./docker-build'
      }
    }
  }

  catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}

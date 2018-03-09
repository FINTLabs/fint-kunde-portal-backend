pipeline {
  agent none
  stages {
    stage('Build') {
      agent { label 'docker' }
      steps {
        script {
          props=readProperties file: 'gradle.properties'
          VERSION="${props.version}"
        }
        sh "docker build --tag 'dtr.rogfk.no/fint-beta/kunde-portal:${VERSION}' ."
      }
    }
    stage('Publish') {
      agent { label 'docker' }
      steps {
        withDockerRegistry([credentialsId: 'dtr-rogfk-no', url: 'https://dtr.rogfk.no']) {
          sh "docker push 'dtr.rogfk.no/fint-beta/kunde-portal:${VERSION}'"
        }
      }
    }
  }
}

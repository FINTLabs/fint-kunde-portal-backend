pipeline {
    agent { label 'docker' }
    stages {
        stage('Build') {
            steps {
                sh "docker build --tag ${GIT_COMMIT} ."
            }
        }
        stage('Publish') {
            when { branch 'master' }
            steps {
                sh "docker tag ${GIT_COMMIT} dtr.fintlabs.no/beta/kunde-portal:latest"
                withDockerRegistry([credentialsId: 'dtr-fintlabs-no', url: 'https://dtr.fintlabs.no']) {
                    sh "docker push 'dtr.fintlabs.no/beta/kunde-portal:latest'"
                }
                withDockerServer([credentialsId: "ucp-fintlabs-jenkins-bundle", uri: "tcp://ucp.fintlabs.no:443"]) {
                    sh "docker service update customer-portal_customer-portal --image dtr.fintlabs.no/beta/kunde-portal:latest --detach=false"
                }
            }
        }
        stage('Publish PR') {
            when { changeRequest() }
            steps {
                sh "docker tag ${GIT_COMMIT} dtr.fintlabs.no/beta/kunde-portal:${BRANCH_NAME}"
                withDockerRegistry([credentialsId: 'dtr-fintlabs-no', url: 'https://dtr.fintlabs.no']) {
                    sh "docker push 'dtr.fintlabs.no/beta/kunde-portal:${BRANCH_NAME}'"
                }
            }
        }
        stage('Publish Tag') {
            when { buildingTag() }
            steps {
                sh "docker tag ${GIT_COMMIT} dtr.fintlabs.no/beta/kunde-portal:${TAG_NAME}"
                withDockerRegistry([credentialsId: 'dtr-fintlabs-no', url: 'https://dtr.fintlabs.no']) {
                    sh "docker push 'dtr.fintlabs.no/beta/kunde-portal:${TAG_NAME}'"
                }
            }
        }
    }
}

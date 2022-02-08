// pipeline {
//     agent { label 'docker' }
//     stages {
//         stage('Build') {
//             steps {
//                 withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
//                     sh "docker build --tag ${GIT_COMMIT} ."
//                 }
//             }
//         }
//         stage('Publish') {
//             when { branch 'master' }
//             steps {
//                 sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/kunde-portal:build.${BUILD_NUMBER}_${GIT_COMMIT}"
//                 withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
//                     sh "docker push fintlabsacr.azurecr.io/kunde-portal:build.${BUILD_NUMBER}_${GIT_COMMIT}"
//                 }
//                 kubernetesDeploy configs: 'k8s.yaml', kubeconfigId: 'aks-beta-fint'
//                 kubernetesDeploy configs: 'k8s.yaml', kubeconfigId: 'aks-api-fint'
//
//             }
//         }
// //        stage('Publish PR') {
// //            when { changeRequest() }
// //            steps {
// //                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
// //                    sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/kunde-portal:${BRANCH_NAME}.${BUILD_NUMBER}"
// //                    sh "docker push fintlabsacr.azurecr.io/kunde-portal:${BRANCH_NAME}.${BUILD_NUMBER}"
// //                }
// //            }
// //        }
// //        stage('Publish Version') {
// //            when {
// //                tag pattern: "v\\d+\\.\\d+\\.\\d+(-\\w+-\\d+)?", comparator: "REGEXP"
// //            }
// //            steps {
// //                script {
// //                    VERSION = TAG_NAME[1..-1]
// //                }
// //                sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/kunde-portal:${VERSION}"
// //                withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
// //                    sh "docker push fintlabsacr.azurecr.io/kunde-portal:${VERSION}"
// //                }
// //            }
// //        }
//     }
// }

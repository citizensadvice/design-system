pipeline {
    agent {
        docker {
            image 'node:12-alpine'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                docker.image('node:12-alpline').inside(' -u 0') {
                    sh 'apk add ruby'
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run vr-test:ci'
            }
        }
    }
}

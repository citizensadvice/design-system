pipeline {
    agent {
        docker {
            image 'node:12-alpine'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'apk add ruby'
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

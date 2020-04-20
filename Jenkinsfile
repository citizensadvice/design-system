pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-u root:root'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'apk add ruby'
                sh 'gem install bundler'
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'bundle install'
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

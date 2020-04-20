pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '--privileged'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'ls -l'
                sh 'bundle config path .'
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
                sh 'npm run vr-test:install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run vr-test:ci'
            }
        }
    }
}

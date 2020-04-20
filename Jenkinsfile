pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-u root:root --privileged'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'bundle config path .'
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

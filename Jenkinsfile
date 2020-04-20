pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-u 500:500 --privileged'
        }
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'ls -l'
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

pipeline {
    agent { dockerfile true }

    stages {
        stage('Prepare') {
            steps {
                sh 'gem install bundler'
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

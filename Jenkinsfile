pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-u root:root --privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

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

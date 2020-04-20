pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-u root:root --privileged -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):$(which docker)'
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
                sh 'dockerd --log-level error && npm run vr-test:ci'
            }
        }
    }
}

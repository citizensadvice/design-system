pipeline {
    agent {
        label "docker && awsaccess"
    }

    stages {
        stage('Test') {
            steps {
                sh './bin/jenkins/test'
            }
        }
    }
}

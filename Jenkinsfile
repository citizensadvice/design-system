pipeline {
    agent {
        label "docker && awsaccess"
    }

    stages {
        stage('Lint') {
            steps {
                sh "./bin/jenkins/lint"
            }
        }
        stage('Test') {
            steps {
                sh './bin/jenkins/test'
            }
        }
        stage('Report') {
            steps {
                sh "./bin/jenkins/fix_visual_test_report"
                step([$class: 'JUnitResultArchiver', testResults: 'testing/backstop_data/ci_report/*.xml'])
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'testing/backstop_data/html_report',
                    reportFiles: 'index.html',
                    reportName: 'BackstopJS Report'
                ])
            }
        }
    }
    post {
        cleanup {
            sh "docker-compose down --remove-orphans || true"
        }
    }
}

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
                    reportDir: 'reports/html_report',
                    reportFiles: 'index.html',
                    reportName: 'BackstopJS Report'
                ])
            }
        }
    }
    post {
        failure {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/html_report',
                reportFiles: 'index.html',
                reportName: 'BackstopJS Report'
            ])
        }
        cleanup {
            sh "docker-compose down --remove-orphans || true"
            sh "rm -rf reports"
        }
    }
}

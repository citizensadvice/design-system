pipeline {
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKER_TAG = "${JOB_NAME}_${getSha()}"
        CA_STYLEGUIDE_VERSION_TAG = "${DOCKER_TAG.toLowerCase()}"
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    currentBuild.displayName = "$BUILD_NUMBER: $DOCKER_TAG"
                }
            }
        }
        stage ('Lint') {
            steps {
                withDockerSandbox(['ca-styleguide.test']) {
                    sh './bin/jenkins/lint'
                }
            }
        }
        stage('Test') {
            steps {
                withDockerSandbox(['ca-styleguide.test', 'visual-tests.test']) {
                    sh './bin/jenkins/test'
                }
            }
        }
        stage('Report') {
            steps {
                sh './bin/jenkins/fix_visual_test_report'
                step([$class: 'JUnitResultArchiver', testResults: 'testing/backstop_data/ci_report/*.xml'])
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports/html_report',
                    reportFiles: 'index.html',
                    reportName: 'BackstopJS Report',
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
                reportName: 'BackstopJS Report',
            ])
        }
        cleanup {
            sh 'rm -rf reports'
        }
    }
}

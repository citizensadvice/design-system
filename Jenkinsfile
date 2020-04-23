pipeline {
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKERTAG = "${env.BRANCH_NAME == 'master' ? '' : 'dev_'}_${getSha}"
        CA_STYLEGUIDE_VERSION_TA = "${DOCKERTAG}"
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    currentBuild.displayName = "$BUILD_NUMBER: $DOCKERTAG"
                }
            }
        }
        stage('Lint & Test') {
            steps {
                withDockerSandbox {
                    sh './bin/jenkins/lint'
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

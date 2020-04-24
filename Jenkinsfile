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
                withDockerSandbox(["ca-styleguide_${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    sh './bin/jenkins/lint'
                }
            }
        }
        stage('Test') {
            steps {
                withDockerSandbox(["ca-styleguide_${CA_STYLEGUIDE_VERSION_TAG}",
                    "ca-backstop_${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    sh './bin/jenkins/check'
                    sh './bin/jenkins/test'
                }
            }
        }
    }
    post {
        always {
            step([$class: 'JUnitResultArchiver',
                testResults: 'testing/backstop_data/ci_report/*.xml',
                allowEmptyResults: true,
            ])
            sh './bin/jenkins/fix_visual_test_report'
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

pipeline {
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKER_TAG = "${JOB_NAME}_${getSha()}"
        CA_STYLEGUIDE_VERSION_TAG = "${DOCKER_TAG.toLowerCase()}"
        BUILD_STAGE = ''
        BUILD_SUCCESS = 'true'
    }
    parameters {
        string(name: 'slackChannel', defaultValue: '#new_platform_github',
            description: 'channel to print messages')
        string(name: 'slackCredentialsId', defaultValue: 'slack-plugin',
            description: 'id of slack credentials used when posting a message')
    }

    stages {
        stage('Setup') {
            steps {
                script { env.BUILD_STAGE = 'Setup' }
                script {
                    currentBuild.displayName = "$BUILD_NUMBER: $DOCKER_TAG"
                }
            }
        }
        stage ('Lint') {
            steps {
                script { env.BUILD_STAGE = 'Lint' }
                withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    sh './bin/jenkins/lint'
            }
        }
    }
        stage('Test') {
            steps {
                script { env.BUILD_STAGE = 'Test' }
                withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}",
                    "ca-backstop${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    sh './bin/jenkins/validate_vr_tests'
                    sh './bin/jenkins/test'
            }
        }
}
    }

    post {
        failure {
            script { env.BUILD_SUCCESS = 'false' }
        }
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
            script {
                try {
                    withSlackNotifier([
                        stage: env.BUILD_STAGE,
                        channel: params.slackChannel,
                        credentialsId: params.slackCredentialsId,
                        message: "${sh(returnStdout: true, script: 'git log -1')}\nBackstop: ${buildLink()}BackstopJS_20Report/"
                    ]) {
                        if (env.BUILD_SUCCESS == 'false') {
                            throw new Exception('Build Failed')
                        }
                    }
                } catch (Exception e) {
                    // do nothing, exception just used to trigger failure message.
                }
            }
        }
        cleanup {
            sh 'rm -rf reports'
        }
    }
}

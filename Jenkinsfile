pipeline {
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKER_TAG = "${JOB_NAME}_${getSha()}"
        CA_STYLEGUIDE_VERSION_TAG = "${DOCKER_TAG.toLowerCase()}"
        BUILD_STAGE = ''
    }
    parameters {
        string(name: 'slackChannel', defaultValue: '#new_platform_builds',
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
                script { throw new Exception('fail on purpose') }
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
                        message: "${sh(returnStdout: true, script: 'git log -1')}\nBackstop: ${BUILD_URL}BackstopJS_20Report/"
                    ]) {
                        if (currentBuild.currentResult != 'SUCCESS') {
                            throw new Exception("Build Failed: ${currentBuild.currentResult}")
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

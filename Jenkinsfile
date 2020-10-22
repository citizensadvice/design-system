deployBranches = ['master']

configurationTypes = [
    //     ['Windows_10_83', 'chrome'], - These seem to be "too" popular!
    ['Windows_10_85', 'chrome'],
    ['Windows_10_80', 'firefox'],
    ['Windows_10_76', 'firefox'],
    ['Windows_7_80', 'chrome'],
    ['Windows_7_78', 'firefox'],
    ['OSX_Mojave_78', 'firefox'],
//     ['OSX_Mojave_12', 'safari'], - These seem to be "too" popular!
]

cron_schedule = deployBranches.contains(BRANCH_NAME) ? '0 2 * * *' : ''

pipeline {
    triggers { cron(cron_schedule) }
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKER_TAG = "${JOB_NAME}_${getSha()}"
        CA_STYLEGUIDE_VERSION_TAG = "dev_${DOCKER_TAG.toLowerCase()}"
        BUILD_STAGE = ''
        ECR_REPOSITORY = '979633842206.dkr.ecr.eu-west-1.amazonaws.com/design-system'
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
                script {
                    // Pull the master images and any previous builds if we're on a different branch
                    // docker-compose only looks in the local images and doesn't try to pull when building
                    ['story-server', 'backstop', 'wcag', 'ruby'].each {
                        sh 'docker pull ${env.ECR_REPOSITORY}:${it}'
                        if (env.BRANCH_NAME != "master") {
                            // Ignore failures from docker - it's probably an Image Not Found.
                            // Other errors like out of disk space will cause problems in other commands
                            result = sh(script: 'docker pull ${env.ECR_REPOSITORY}:${it}-${env.CA_STYLEGUIDE_VERSION_TAG}', returnStatus: true)
                        }
                    }
                }
                script { sh 'docker-compose build' }
                script {
                    // Push updated containers so they can be used on the next run
                    ['story-server', 'backstop', 'wcag', 'ruby'].each {
                        if (env.BRANCH_NAME == "master") {
                            // If we're building on master, update the master images.
                            sh 'docker tag ${env.ECR_REPOSITORY}:${it}-${CA_STYLEGUIDE_VERSION_TAG} ${env.ECR_REPOSITORY}:${it}'
                            sh 'docker push ${env.ECR_REPOSITORY}:${it}'
                        } else {
                            sh 'docker push ${env.ECR_REPOSITORY}:${it}-${env.CA_STYLEGUIDE_VERSION_TAG}'
                        }
                    }
                }
            }
        }
        stage('Lint and unit test') {
            steps {
                script { env.BUILD_STAGE = 'Lint and unit test' }
                withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    sh './bin/jenkins/test'
                }
            }
        }
        stage('Sanity Test') {
            steps {
                script { env.BUILD_STAGE = 'Sanity Test' }
                withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}",
                        "ca-backstop${CA_STYLEGUIDE_VERSION_TAG}"]) {
                    script {
                        try {
                            sh './bin/jenkins/visual_regression'
                            sh './bin/docker/a11y-test'
                            sh './bin/docker/grid_tests'
                        } catch (Exception e) {
                            sh 'docker-compose logs --no-color'
                            currentBuild.result = 'FAILURE'
                        }
                    }
                }
            }
        }
        stage('Full Regression Test') {
            steps {
                script {
                    if (deployBranches.contains(BRANCH_NAME)) {
                        env.BUILD_STAGE = 'Full Regression Test'
                        withVaultSecrets([
                            BROWSERSTACK_USERNAME: '/secret/devops/public-website/develop/env, BROWSERSTACK_USERNAME',
                            BROWSERSTACK_ACCESS_KEY: '/secret/devops/public-website/develop/env, BROWSERSTACK_ACCESS_KEY',
                        ])
                        {
                            withDockerSandbox {
                                configurationTypes.each { opts ->
                                    def (config, browser) = opts
                                    sh "BROWSERSTACK_CONFIGURATION_OPTIONS=$config BROWSER=$browser ./bin/docker/browserstack_tests"
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            step([$class: 'JUnitResultArchiver',
                testResults: 'testing/visual-regression/backstop_data/ci_report/*.xml',
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
            archiveArtifacts([
                artifacts: 'testing/artifacts/screenshots/*.png, ' +
                'testing/artifacts/reports/report.html, ' +
                'testing/artifacts/reports/*.xml, ' +
                'testing/artifacts/reports/report.json, ' +
                'testing/artifacts/html_pages/*.html, ' +
                'testing/artifacts/logs/*.log',
                allowEmptyArchive: true,
                caseSensitive: false
            ])
            script {
                if (deployBranches.contains(BRANCH_NAME)) {
                    try {
                        withSlackNotifier([
                            stage: env.BUILD_STAGE,
                            channel: params.slackChannel,
                            credentialsId: params.slackCredentialsId,
                            message: "${sh(returnStdout: true, script: 'git log -1')}" +
                                     "\nBackstop: ${BUILD_URL}BackstopJS_20Report/",]) {
                            if (currentBuild.currentResult != 'SUCCESS') {
                                throw new Exception("Build Failed: ${currentBuild.currentResult}")
                            }
                                     }
                    } catch (Exception e) {
                    // do nothing, exception just used to trigger failure message.
                    }
                }
            }

            cleanWs()
        }
        cleanup {
            sh 'rm -rf reports'
        }
    }
}

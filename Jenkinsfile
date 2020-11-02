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

def docker_registry = '979633842206.dkr.ecr.eu-west-1.amazonaws.com'
def docker_registry_url = "https://${docker_registry}"
def ecr_credential = 'ecr:eu-west-1:cita-devops'

def images = [:]

pipeline {
    triggers { cron(cron_schedule) }
    agent {
        label 'docker && awsaccess'
    }
    environment {
        DOCKER_TAG = "${env.BRANCH_NAME}_${getSha()}"
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
                script {
                    docker.withRegistry(docker_registry_url, ecr_credential) {
                        // Pull the master images and any previous builds if we're on a different branch
                        // docker-compose only looks in the local images and doesn't try to pull when building
                        ['ca-styleguide', 'backstop', 'wcag', 'ruby'].each {
                            images[it] = "${docker_registry}/design-system:dev_${it}_${env.CA_STYLEGUIDE_VERSION_TAG}"
                            // Ignore failures from docker - it's probably an Image Not Found.
                            // Other errors like out of disk space will cause problems in other commands
                            try {
                                docker.image("${docker_registry}/design-system:${it}").pull()
                                if (env.BRANCH_NAME != 'master') {
                                        docker.image(images[it]).pull()
                                }
                            } catch (Exception e) {
                                    echo "Error pulling ${images[it]}"
                            }
                        }
                    }
                }
                script { sh 'docker-compose build' }
                script {
                    docker.withRegistry(docker_registry_url, ecr_credential) {
                        // Push updated containers so they can be used on the next run
                        ['ca-styleguide', 'backstop', 'wcag', 'ruby'].each {
                            if (env.BRANCH_NAME == 'master') {
                                // If we're building on master, update the master images.
                                // The tag function only changes the last part of the image name (unlike docker tag)
                                docker.image("${images[it]}").tag("${it}")
                                docker.image("${docker_registry}/design-system:${it}").push()
                            } else {
                                docker.image("${images[it]}").push()
                            }
                        }
                    }
                }
            }
        }
        stage('Lint') {
            environment {
                PRODUCTION="true"
                NODE_ENV="test"
            }
            steps {
                script { env.BUILD_STAGE = 'Lint' }
                withDockerSandbox([ images['ca-styleguide'], images['cucumber'] ]) {
                    sh 'docker-compose run cucumber bundle exec rake ruby:lint'
                    sh 'docker-compose run ca-styleguide bundle exec rake npm:lint'
                }
            }
        }
        stage('Unit test') {
            environment {
                PRODUCTION="true"
                NODE_ENV="test"
            }
            steps {
                script { env.BUILD_STAGE = 'Unit test' }
                withDockerSandbox([ images['ca-styleguide'] ]) {
                    sh 'docker-compose run ca-styleguide bundle exec rake npm:jest'
                }
            }
        }
        stage('Sanity Test') {
            steps {
                script { env.BUILD_STAGE = 'Sanity Test' }
                withDockerSandbox([ images['ca-styleguide'], images['ca-backstop'] ]) {
                    script {
                        try {
                            sh './bin/jenkins/visual_regression'
                            sh './bin/docker/a11y-test'
                            sh './bin/docker/grid_tests'
                        } catch (Exception e) {
                            sh 'docker-compose logs --no-color'
                            currentBuild.result = 'FAILURE'
                            throw e
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

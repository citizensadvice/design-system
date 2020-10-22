deployBranches = ['master']

configurationTypes = [
//     ['Windows_10_83', 'chrome'], - These seem to be "too" popular!
    ['Windows_10_85', 'chrome'],
    ['Windows_10_80', 'firefox'],
    ['Windows_10_76', 'firefox'],
    ['Windows_7_80', 'chrome'],
    ['Windows_7_78', 'firefox'],
    ['OSX_Catalina_80', 'firefox'],
    ['OSX_Mojave_78', 'firefox'],
//     ['OSX_Mojave_12', 'safari'], - These seem to be "too" popular!
]

cron_schedule = deployBranches.contains(BRANCH_NAME) ? "0 2 * * *" : ""

def docker_registry = '979633842206.dkr.ecr.eu-west-1.amazonaws.com'
def docker_registry_url = "https://${docker_registry}"
def ecr_credential = 'ecr:eu-west-1:cita-devops'

pipeline {
    triggers { cron(cron_schedule) }
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
                script {
                    docker.withRegistry(docker_registry_url, ecr_credential) {
                        // Pull the master images and any previous builds if we're on a different branch
                        // docker-compose only looks in the local images and doesn't try to pull when building
                        ['story-server', 'backstop', 'wcag', 'ruby'].each {
                            // Ignore failures from docker - it's probably an Image Not Found.
                            // Other errors like out of disk space will cause problems in other commands
                            try {
                                docker.image("${docker_registry}/design-system:${it}").pull()
                                if (env.BRANCH_NAME != 'master') {
                                        docker.image("${docker_registry}:dev_${it}-${env.CA_STYLEGUIDE_VERSION_TAG}").pull()
                                }
                            } catch (Exception e) {
                                    echo "Error pulling ${docker_registry}:dev_${it}-${env.CA_STYLEGUIDE_VERSION_TAG}"
                            }
                        }
                    }
                }
                script { sh 'docker-compose build' }
                script {
                    docker.withRegistry(docker_registry_url, ecr_credential) {
                        // Push updated containers so they can be used on the next run
                        ['story-server', 'backstop', 'wcag', 'ruby'].each {
                            if (env.BRANCH_NAME == 'master') {
                                // If we're building on master, update the master images.
                                docker.image("${docker_registry}:dev_${it}-${CA_STYLEGUIDE_VERSION_TAG}").tag("${docker_registry}:${it}")
                                docker.image("${docker_registry}:${it}").push()
                            } else {
                                docker.image("${docker_registry}:dev_${it}-${env.CA_STYLEGUIDE_VERSION_TAG}").push()
                            }
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
                            sh('./bin/jenkins/visual_regression')
                            sh('./bin/docker/a11y-test')
                            sh('./bin/docker/grid_tests')
                        } catch (Exception e) {
                            sh('docker-compose logs --no-color')
                            error(e)
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

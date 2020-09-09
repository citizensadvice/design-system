deployBranches = ['master']

configurationTypes = [
    ['Windows_10_83', 'chrome'],
    ['Windows_10_81', 'chrome'],
    ['Windows_10_77', 'firefox'],
    ['Windows_10_76', 'firefox'],
    ['Windows_7_80', 'chrome'],
    ['Windows_7_75', 'firefox'],
    ['Windows_7_11', 'internet_explorer'],
    ['OSX_Catalina_83', 'chrome'],
    ['OSX_Catalina_77', 'firefox'],
    ['OSX_Mojave_83', 'chrome'],
    ['OSX_Mojave_83', 'firefox'],
    ['OSX_Mojave_12', 'safari'],
]

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
//         stage('Lint') {
//             steps {
//                 script { env.BUILD_STAGE = 'Lint' }
//                 withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}"]) {
//                     sh './bin/jenkins/lint'
//                 }
//             }
//         }
        stage('Sanity Test') {
            steps {
                script { env.BUILD_STAGE = 'Sanity Test' }
                withDockerSandbox(["ca-styleguide${CA_STYLEGUIDE_VERSION_TAG}",
                    "ca-backstop${CA_STYLEGUIDE_VERSION_TAG}"]) {
//                     sh './bin/jenkins/validate_vr_tests'
//                     sh './bin/jenkins/test'
//                     sh './bin/docker/a11y-test'
                    sh "printenv"
                    sh './bin/docker/grid_tests'
                }
            }
        }
//         stage('Full Regression Test') {
//             steps {
//                 script {
//                     if (deployBranches.contains(BRANCH_NAME)) {
//                         env.BUILD_STAGE = 'Full Regression Test'
//                         withVaultSecrets([
//                             BROWSERSTACK_USERNAME: '/secret/devops/public-website/develop/env, BROWSERSTACK_USERNAME',
//                             BROWSERSTACK_ACCESS_KEY: '/secret/devops/public-website/develop/env, BROWSERSTACK_ACCESS_KEY',
//                         ])
//                         {
//                             withDockerSandbox {
//                                 configurationTypes.each { opts ->
//                                     def (config, browser) = opts
//                                     sh "echo Browserstack configuration to be used is: $config"
//                                     sh "echo Browser Under Test is: $browser"
//                                     sh "BROWSERSTACK_CONFIGURATION_OPTIONS=$config BROWSER=$browser ./bin/docker/browserstack_tests"
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
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

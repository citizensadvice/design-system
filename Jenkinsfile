deployBranches = ['master']
isRelease = deployBranches.contains(env.BRANCH_NAME)
proBrowserstackVaultSecrets = [
  BROWSERSTACK_USERNAME: '/secret/devops/public-website/develop/env, PRO_BROWSERSTACK_USERNAME',
  BROWSERSTACK_ACCESS_KEY: '/secret/devops/public-website/develop/env, PRO_BROWSERSTACK_ACCESS_KEY',
]
mobileBrowserstackVaultSecrets = [
  BROWSERSTACK_USERNAME: '/secret/devops/public-website/develop/env, MOBILE_BROWSERSTACK_USERNAME',
  BROWSERSTACK_ACCESS_KEY: '/secret/devops/public-website/develop/env, MOBILE_BROWSERSTACK_ACCESS_KEY',
]
browserStackTestingMatrix = [
  [browser: 'chrome', config: 'Windows_10_89'],
  [browser: 'chrome', config: 'Windows_7_83'],
  [browser: 'chrome', config: 'OSX_Mojave_87'],
  [browser: 'firefox', config: 'Windows_10_88'],
  [browser: 'firefox', config: 'Windows_7_83'],
  [browser: 'safari', config: 'OSX_Mojave_12'],
  [browser: 'ios', config: 'iPhone11_13'],
  [browser: 'ios', config: 'iPad7th_13'],
  [browser: 'ios', config: 'iPhone8_12', permissibleFail: true],
]

cron_schedule = isRelease ? '0 2 * * *' : ''

docker_registry = '979633842206.dkr.ecr.eu-west-1.amazonaws.com'
docker_registry_url = "https://${docker_registry}"
ecr_credential = 'ecr:eu-west-1:cita-devops'

images = [:]

global_environment_variables = []

// Pipeline definition begins here

node('docker && awsaccess') {
  try {
    cleanWs()
    checkout scm

    global_environment_variables = [
      "DOCKER_TAG=${env.BRANCH_NAME}_${getSha()}",
      // Using the commit SHA would mean that every build
      // gets a different tag and this busts the cache between PR builds.
      "CA_STYLEGUIDE_VERSION_TAG=${env.BRANCH_NAME}"
    ]

    withDockerRegistry(registry: [credentialsId: 'docker_hub']) {
      withEnv(global_environment_variables) {
        currentBuild.displayName = "$BUILD_NUMBER: $DOCKER_TAG"
        slackNotifyReleaseOnly() {
          pipeline()
        }
      }
    }
  }
  finally {
    cleanWs()
  }
}

properties([
  parameters([
    string(defaultValue: '#new_platform_builds', description: 'channel to print messages', name: 'slackChannel'),
    string(defaultValue: 'slack-plugin', description: 'id of slack credentials used when posting a message', name: 'slackCredentialsId')
  ]),
  pipelineTriggers([cron(cron_schedule)])
])

def pipeline() {
  stage('Update Docker Images') {
    docker.withRegistry(docker_registry_url, ecr_credential) {
      // Pull the master images and any previous builds if we're on a different branch
      // docker-compose only looks in the local images and doesn't try to pull when building
      ['ca-styleguide', 'wcag', 'ruby'].each {
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

      sh 'docker-compose build'

      // Push updated containers so they can be used on the next run
      ['ca-styleguide', 'wcag', 'ruby'].each {
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

  stage('Lint') {
    withDockerSandbox([ images['ca-styleguide'], images['ruby'] ]) {
      withEnv(['PRODUCTION=true', 'NODE_ENV=test']) {
        sh 'docker-compose run ruby-tests bundle exec rake ruby:lint'
        sh 'docker-compose run ca-styleguide bundle exec rake npm:lint'
      }
    }
  }

  stage('Unit test') {
    withDockerSandbox([ images['ca-styleguide'] ]) {
      withEnv(['PRODUCTION=true', 'NODE_ENV=test']) {
        sh 'docker-compose run ca-styleguide bundle exec rake npm:jest'
      }
    }

    step ([$class: 'JUnitResultArchiver', testResults: 'testing/visual-regression/backstop_data/ci_report/?*.xml', allowEmptyResults: true])
  }

  stage('Visual Regression Tests') {
    withDockerSandbox(['backstopjs/backstopjs']) {
      try {
        sh './bin/jenkins/visual_regression'
      } catch (Exception e) {
        sh 'docker-compose logs --no-color'
        currentBuild.result = 'FAILURE'
        throw e
      } finally {
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
    }
  }

  stage('Accessibility Tests') {
    withDockerSandbox([images['wcag'] ]) {
      try {
        sh './bin/docker/a11y-test'
      } catch (Exception e) {
        sh 'docker-compose logs --no-color'
        currentBuild.result = 'FAILURE'
        throw e
      }
    }
  }

  if (true) {
    stage('Browserstack Tests') {
      parallel define_browserstack_tests()
    }
  } else {
    stage('Grid Tests') {
      parallel define_grid_tests()
    }
  }
} // end pipeline

def slackNotifyReleaseOnly(Closure body) {
  if (!isRelease) {
    body()
    return
  }
  withSlackNotifier(
    [
      channel: params.slackChannel,
      credentialsId: params.slackCredentialsId,
      message: "${sh(returnStdout: true, script: 'git log -1')}" +
                "\nBackstop: ${BUILD_URL}BackstopJS_20Report/",
    ]
  ) {
    body()
  }
}

// Grid and Browserstack Tests

def withTestingNode(String description, Boolean useBrowserStack, Boolean isMobile, Closure body) {
  node('docker && awsaccess') {
    try {
      stage(description) {
        checkout scm

        withDockerRegistry(registry: [credentialsId: 'docker_hub']) {
          withEnv(global_environment_variables) {
            styleguide_image = isRelease ? "${docker_registry}/design-system:ca-styleguide" : images['ca-styleguide']
            ruby_image = isRelease ? "${docker_registry}/design-system:ruby" : images['ruby']
            local_images = []
            if (useBrowserStack) {
              if (isRelease) {
                local_images = [images['ruby']]
              }
              withForcedDockerUpdate([ruby_image], local_images) {
                // Call closure with correct type of browserstack details for remote testing
                if (isMobile) {
                  withVaultSecrets(mobileBrowserstackVaultSecrets) { body() }
                } else {
                  withVaultSecrets(proBrowserstackVaultSecrets) { body() }
                }
              }
            } else {
              if (isRelease) {
                local_images = [images['ruby'], images['ca-styleguide']]
              }
              withForcedDockerUpdate(
                [
                  styleguide_image,
                  ruby_image,
                  'selenium/hub:4.0.0-alpha-6-20200609',
                  'selenium/node-chrome:4.0.0-alpha-6-20200609',
                  'selenium/node-firefox:4.0.0-alpha-6-20200609'
                ], local_images) {
                // Call closure
                body()
              } // end withForcedDockerUpdate
            } // end if
          } // end withEnv
        } // end withDockerRegistry
      } // end stage
    } finally {
      cleanWs()
    } // end try/finally
  } // end node
} // end withTestingNode

def define_grid_tests() {
  grid_tests = [:]
  grid_tests.failFast = false

  ['chrome', 'firefox'].each { browser ->
    grid_tests[browser] = {
      withTestingNode("Interim Stage: Test ${browser}", false, false) {
        try {
          sh "BROWSER=${browser} bin/docker/grid_tests"
        } catch (Exception e) {
          sh 'docker-compose logs --no-color'
          currentBuild.result = 'FAILURE'
          throw e
        } finally {
          // Archive artifacts from this test run in $browser/other
          archiveArtifacts(
            [ // The ?* is to get around an annoying warning from the syntax highlighter which doesn't realise that /* in a string isn't the start comment token.
              artifacts: "testing/artifacts/${browser}/other/screenshots/?*.png, " +
                         "testing/artifacts/${browser}/other/reports/report.html, " +
                         "testing/artifacts/${browser}/other/reports/?*.xml, " +
                         "testing/artifacts/${browser}/other/logs/?*.log",
              allowEmptyArchive: true,
              caseSensitive: false
            ]
          )
        }  // end try/catch/finally
      } // end withTestingNode
    } // end grid_tests[browser] block
  } // end each

  return grid_tests
}

def define_browserstack_tests() {
  browserstackTestStages = [failFast: false]

  browserStackTestingMatrix.each {
    def stepName = "Running ${it.browser} on ${it.config}"
    browserstackTestStages[stepName] = {
      def isMobile = (it.browser == "ios" || it.browser == "android")
      withEnv([
        "BROWSER=${it.browser}",
        "BROWSERSTACK_CONFIGURATION_OPTIONS=${it.config}",
        'BROWSERSTACK=true',
        "BROWSERSTACK_BUILD_NAME=Design system (Jenkins) ${env.BRANCH_NAME}_${getSha()}"
      ]) {
        withTestingNode("Browser Tests for ${it.browser} on ${it.config}", true, isMobile) {
          try {
            sh './bin/docker/browserstack_tests'
          } catch (Exception e) {
            if (it.permissibleFail) {
              catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                sh "exit 1"
              }

              withCredentials([string(credentialsId: params.slackCredentialsId, variable: 'SLACK_TOKEN')]) {
                message = "${env.BUILD_TAG}\n"
                message += "STAGE: ${BUILD_STAGE}\n"
                message += "${sh(returnStdout: true, script: "git log -1 --pretty=format':%h %s (%an, %ar)'")}\n"
                message += "${it.browser} ${it.config} was PERMITTED TO FAIL"

                slackSend(
                  token: SLACK_TOKEN,
                  channel: params.slackChannel,
                  color: 'warning',
                  message: message
                )
              }
            } else {
              sh 'docker-compose logs --no-color'
              currentBuild.result = 'FAILURE'
              throw e
            }
          } finally {
            // Archive artifacts from this test run in $browser/$config
            archiveArtifacts(
              [ // The ?* is to get around an annoying warning from the syntax highlighter which doesn't realise that /* in a string isn't the start comment token.
                artifacts: "testing/artifacts/${it.browser}/${it.config}/screenshots/?*.png, " +
                           "testing/artifacts/${it.browser}/${it.config}/reports/report.html, " +
                           "testing/artifacts/${it.browser}/${it.config}/reports/?*.xml, " +
                           "testing/artifacts/${it.browser}/${it.config}/logs/?*.log",
                allowEmptyArchive: true,
                caseSensitive: false
              ]
            )
          } // end try/catch/finally
        } // end withTestingNode
      } // end withEnv
    } // end browserstack_tests[stepName] block
  } // end each

  return browserstackTestStages
}

def withForcedDockerUpdate(images = [], local_images = [], Closure body) {
  docker.withRegistry(docker_registry_url, ecr_credential) {
    images.each {
      sh "docker pull ${it}"
      sh "docker image tag ${it} ${it}_tmp"
      sh "docker image rm ${it}"
      sh "docker pull ${it}"
      sh "docker image rm ${it}_tmp"
    }
    try {
      withDockerSandbox(images) {
        body{}
      }
    } finally {
      // docker-compose builds a container with a name like dev_ruby_master on the release branch
      // This name doesn't exist remotely.
      // If this exists in the local context then it will be used. So it needs to be removed
      local_images.each {
        // Delete the image if it exists - it's ok if there's an error which will most likely be the tag does not exist.
        sh "docker image rm ${it}"
      }
    }
  }
}

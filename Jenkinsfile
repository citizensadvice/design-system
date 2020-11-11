deployBranches = ['master']
isRelease = deployBranches.contains(env.BRANCH_NAME)
nodeLabel = 'docker && awsaccess'

configurationTypes = [
    ['Windows_10_85', 'chrome'],
    ['Windows_10_81', 'firefox'],
    ['Windows_7_80', 'chrome'],
    ['Windows_7_78', 'firefox'],
    ['OSX_Mojave_84', 'chrome'],
    ['OSX_Mojave_12', 'safari'],
    ['iPhone11_13', 'ios'],
    ['iPhone8_12', 'ios'],
]

cron_schedule = isRelease ? '0 2 * * *' : ''

properties([
  parameters([
    string(defaultValue: '#new_platform_builds', description: 'channel to print messages', name: 'slackChannel'),
    string(defaultValue: 'slack-plugin', description: 'id of slack credentials used when posting a message', name: 'slackCredentialsId')
    ]),
    pipelineTriggers([cron(cron_schedule)])
])

def docker_registry = '979633842206.dkr.ecr.eu-west-1.amazonaws.com'
def docker_registry_url = "https://${docker_registry}"
def ecr_credential = 'ecr:eu-west-1:cita-devops'

def images = [:]

node(nodeLabel) {
  stage('Setup') {
    cleanWs()
    //checkout scm
    git credentialsId: 'jenkins-pipeline-gh-access', url: 'https://github.com/citizensadvice/design-system.git'
    slackNotifyReleaseOnly {
      stash 'source'

      withEnv(["DOCKER_TAG=${dockerTag()}",
              // Using the commit SHA would mean that every build
              // gets a different tag and this busts the cache between PR builds.
              "CA_STYLEGUIDE_VERSION_TAG=${env.BRANCH_NAME}"
            ]) {
        currentBuild.displayName = "$BUILD_NUMBER: $DOCKER_TAG"

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
        }
        sh 'docker-compose build'
        docker.withRegistry(docker_registry_url, ecr_credential) {
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
    }
  }

  stage('Lint') {
    slackNotifyReleaseOnly {
      withDockerSandbox([ images['ca-styleguide'], images['ruby'] ]) {
        withEnv(['PRODUCTION=true', 'NODE_ENV=test']) {
          sh 'docker-compose run ruby-tests bundle exec rake ruby:lint'
          sh 'docker-compose run ca-styleguide bundle exec rake npm:lint'
        }
      }
    }
  }
  stage('Unit test') {
    slackNotifyReleaseOnly {
      withDockerSandbox([ images['ca-styleguide'] ]) {
        withEnv(['PRODUCTION=true', 'NODE_ENV=test']) {
          sh 'docker-compose run ca-styleguide bundle exec rake npm:jest'
        }
      }
      step([$class: 'JUnitResultArchiver',
                  testResults: 'testing/visual-regression/backstop_data/ci_report/*.xml',
                  allowEmptyResults: true,
              ])
    }
  }
  stage('Visual Regression Tests') {
    slackNotifyReleaseOnly {
      withDockerSandbox([
                images['ca-styleguide'],
                'backstopjs/backstopjs'
            ]) {
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
  }
  stage('Accessibility Tests') {
    slackNotifyReleaseOnly {
      withDockerSandbox([
                images['ca-styleguide'],
                images['ruby'],
                images['wcag'] ]) {
        try {
          sh './bin/docker/a11y-test'
        } catch (Exception e) {
          sh 'docker-compose logs --no-color'
          currentBuild.result = 'FAILURE'
          throw e
        }
      }
    }
  }
}

grid_tests = [:]
['chrome', 'firefox'].each { browser ->
  grid_tests[browser] = {
     withCucumberNode("Interim Stage: Test ${browser}",
                [
                    images['ruby'],
                    'selenium/hub:4.0.0-alpha-6-20200609',
                    "selenium/node-${browser}:4.0.0-alpha-6-20200609"
                ]
            ) {
                try {
                    sh "BROWSER=${browser} bin/docker/grid_tests"
                } catch (Exception e) {
                    sh 'docker-compose logs --no-color'
                    currentBuild.result = 'FAILURE'
                    throw e
                }
            }
  }
}
grid_tests['regression'] = {
          stage('Full Regression Test') {
            node(nodeLabel) {
              unstash 'source'
              if (deployBranches.contains(env.BRANCH_NAME)) {
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

grid_tests.failFast = false

parallel grid_tests


def withCucumberNode(def description, def imageMap, Closure body) {
  node('docker && awsaccess') {
        stage(description) {
          unstash 'source'
          slackNotifyReleaseOnly {
            withDockerSandbox(imageMap) {
              // Call closure
              body()
            } // withDockerSandbox
          } //slack
    } // stage
  } // node
} // withCucumberNode

def dockerTag() {
  "${env.BRANCH_NAME}_${getSha()}"
}


// archiveArtifacts([
//                 artifacts: 'testing/artifacts/screenshots/*.png, ' +
//                 'testing/artifacts/reports/report.html, ' +
//                 'testing/artifacts/reports/*.xml, ' +
//                 'testing/artifacts/reports/report.json, ' +
//                 'testing/artifacts/html_pages/*.html, ' +
//                 'testing/artifacts/logs/*.log',
//                 allowEmptyArchive: true,
//                 caseSensitive: false
//             ])

def slackNotifyReleaseOnly(Closure body) {
  if (!isRelease) {
    body()
    return
  }
  withSlackNotifier([
                      channel: params.slackChannel,
                      credentialsId: params.slackCredentialsId,
                      message: "${sh(returnStdout: true, script: 'git log -1')}" +
                                "\nBackstop: ${BUILD_URL}BackstopJS_20Report/",]) {
    body()
  }
}

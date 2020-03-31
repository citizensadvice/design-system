#!/usr/bin/env groovy

appName = "design-system"

isRelease = env.BRANCH_NAME == "master"
def tagPrefix = isRelease ? "" : "dev_"
dockerTag = "${tagPrefix}${env.BUILD_TAG}"

node("docker && awsaccess") {
  // docker tests create files as root
  sh "sudo rm -rf .jenkins*"
  checkout scm
  dockerTag += "_${getSha()}"
  currentBuild.displayName = "${env.BUILD_NUMBER}: ${dockerTag}"

  // prevent docker-compose from rebuilding the image
  withEnv(["CA_STYLEGUIDE_VERSION_TAG=:${dockerTag}"]) {
   dockerBuild(context: pwd(), tag: dockerImageId())
  }

}

@NonCPS
def dockerImageId() {
  "design-system:${dockerTag}"
}

def dockerBuild(Map config) {
  def image = null

  try {
    stage("Build ${config.tag}") {
      dir(config.context) {
        image = docker.build(config.tag)
      }
    }
    stage("Lint ${config.tag}") {
      def lintScript = "bin/jenkins/lint"
      if(fileExists("${config.context}/${lintScript}")) {
        sh "${lintScript}"
      } else {
        echo "Nothing to lint"
      }
    }
    // stage("Test ${config.tag}") {
    //   def testScript = "bin/jenkins/test"
    //   if(fileExists("${config.context}/${testScript}")) {
    //     sh "${testScript}"
    //       step([
    //         $class : 'RcovPublisher', reportDir: './coverage/rcov',
    //         targets: [
    //             [metric: "CODE_COVERAGE", healthy: 80, unhealthy: 75, unstable: 70]
    //         ]
    //       ])
    //       publishHTML([
    //         allowMissing: false,
    //         alwaysLinkToLastBuild: true,
    //         keepAll: true,
    //         reportDir: '.jenkins-jest/lcov-report',
    //         reportFiles: 'index.html',
    //         reportName: 'Jest Report'
    //       ])
    //   } else {
    //     echo "No tests"
    //   }
    // }
  } finally {
    sh "./bin/docker/down || true"
  }
}

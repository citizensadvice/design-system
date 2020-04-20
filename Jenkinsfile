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
    //     sh "./bin/docker/start"

    //     sleep 120

    //     try {
    //       sh "${testScript}"
    //     } catch (e) {
    //       currentBuild.result = "FAILED"
    //       echo "Test Error: ${e}"
    //     } finally {
    //       sh "./bin/jenkins/fix_visual_test_report"
    //       step([$class: 'JUnitResultArchiver', testResults: 'testing/backstop_data/ci_report/*.xml'])
    //       publishHTML([
    //         allowMissing: false,
    //         alwaysLinkToLastBuild: true,
    //         keepAll: true,
    //         reportDir: 'testing/backstop_data/html_report',
    //         reportFiles: 'index.html',
    //         reportName: 'BackstopJS Report'
    //       ])
    //     }
    //   } else {
    //     echo "No tests"
    //   }
    // }
  } finally {
    sh "./bin/docker/down || true"
    sh "docker network rm cita"
  }
}

pipeline {
  agent any
  stages {
    stage('gg') {
      steps {
        sh 'sudo echo "Poop"'
      }
    }

    stage('AWS Credentials') {
      parallel {
        stage('AWS Credentials') {
          steps {
            withCredentials(bindings: [[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'Bear1', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
              sh """
                                                                                                                                                                                                                                                                                                            mkdir -p ~/.aws
                                                                                                                                                                                                                                                                                                            echo "[default]" >~/.aws/credentials
                                                                                                                                                                                                                                                                                                            echo "[default]" >~/.boto
                                                                                                                                                                                                                                                                                                            echo "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >>~/.boto    
                                                                                                                                                                                                                                                                                                            echo "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >>~/.boto
                                                                                                                                                                                                                                                                                                            echo "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >>~/.aws/credentials
                                                                                                                                                                                                                                                                                                            echo "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >>~/.aws/credentials
                                                                                                                                                                                                                                                                                                              """
            }

          }
        }

        stage('oot') {
          steps {
            sh '''sudo curl -fsSL https://get.docker.com -o get-docker.sh
sudo get-docker.sh'''
          }
        }

      }
    }

    stage('Docker login') {
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'DOCKER', passwordVariable: 'word',  usernameVariable:  'user')]) {
          sh 'docker login --username $user --password $word'
        }

      }
    }

  }
}
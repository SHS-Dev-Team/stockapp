pipeline {
  agent any
  stages {
    stage('hello world') {
      steps {
        echo 'Hello world'
      }
    }

    stage('Credentials') {
      steps {
        withCredentials(bindings: [[$class:  'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'bear1', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
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

    stage('docker login') {
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'docker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'sudo docker login --username $USER --password $PASS'
        }

      }
    }

    stage('push docker') {
      steps {
        sh './push_docker.sh'
      }
    }

    stage('access') {
      steps {
        sh 'kubectl config use-context minikube'
      }
    }

  }
}
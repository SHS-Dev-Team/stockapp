pipeline {
  agent any
  stages {
    stage('hello world') {
      steps {
        echo 'Hello world'
      }
    }

    stage('docker login') {
      parallel {
        stage('docker login') {
          steps {
            withCredentials(bindings: [usernamePassword(credentialsId: 'docker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
              sh 'docker login --username $USER --password $PASS'
            }

          }
        }

        stage('google login') {
          steps {
            sh 'ls; cd stockapp/; gcloud auth activate-service-account burrow@megajesus.iam.gserviceaccount.com --key-file=megajesus-aa7a78652074.json; gcloud config set project megajesus'
          }
        }

      }
    }

    stage('google') {
      steps {
        sh 'ls; cd stockapp/; echo \'y\' | gcloud app deploy'
      }
    }

  }
}
pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
    }

    parameters {
        choice(
            name: 'BUILD_ENV',
            choices: ['staging', 'local', 'production', 'none'],
            description: 'Select the environment configuration to inject (.env file)'
        )
    }

    environment {
        ANDROID_HOME     = "${HOME}/Library/Android/sdk"
        ANDROID_SDK_ROOT  = "${HOME}/Library/Android/sdk"
        JAVA_HOME = "/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home"
        PATH = "${HOME}/.nvm/versions/node/v24.14.0/bin:/opt/homebrew/bin:/usr/local/bin:${JAVA_HOME}/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:/usr/bin:/bin:/usr/sbin:/sbin"
        LANG = 'en_US.UTF-8'

        //Define the keystore name which uploaded on jenkins credential
        ANDROID_KEYSTORE_FILE_ID = 'google-mobile-ads-keystore-file' // Secret file
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                    set -e
                    echo "=== Node / npm versions ==="
                    node --version
                    npm --version

                    echo "=== Removing old dependencies ==="
                    rm -rf package-lock.json node_modules

                    echo "=== Installing npm packages (resilient install) ==="
                    npm install --legacy-peer-deps

                    echo "=== Cleaning Android build ==="
                    cd android && rm -rf build .cxx && ./gradlew && ./gradlew clean && cd ..
                '''
            }
        }

        stage('Inject Environment Config') {
            steps {
                script {
                    def envType = ''
                    
                    // 1. Check if parameter is specified
                    if (params.BUILD_ENV && params.BUILD_ENV != 'none') {
                        envType = params.BUILD_ENV
                        echo "Environment selected from build parameters: ${envType}"
                    } 
                    // 2. Fallback to Job Name suffix detection
                    else {
                        if (env.JOB_NAME.contains('local')) {
                            envType = 'local'
                        } else if (env.JOB_NAME.contains('production')) {
                            envType = 'production'
                        } else if (env.JOB_NAME.contains('staging')) {
                            envType = 'staging'
                        }
                        if (envType != '') {
                            echo "Environment detected from job name: ${envType}"
                        }
                    }
                    
                    if (envType != '') {
                        //Before making build you need update credentail name 
                        def credentialId = "google-mobile-ads-env-${envType}"
                        echo "Attempting to inject env config for ${envType} using credential ${credentialId}..."
                        try {
                            withCredentials([file(credentialsId: credentialId, variable: 'ENV_FILE')]) {
                                sh "cp \$ENV_FILE .env"
                                sh "cp \$ENV_FILE .env.${envType}"
                                echo "Successfully injected .env and .env.${envType} configurations."
                            }
                        } catch (Exception e) {
                            echo "Warning: Environment config credential '${credentialId}' not found in Jenkins. Skipping env injection."
                        }
                    } else {
                        echo "No environment configuration injected (selected 'none' and no environment suffix in job name)."
                    }
                }
            }
        }

        stage('Set Build Version') {
            steps {
                script {
                    env.APP_BUILD_NUMBER = env.BUILD_NUMBER
                }
            }
        }

        stage('Build Android Staging (APK)') {
            steps {
                withCredentials([
                    file(credentialsId: env.ANDROID_KEYSTORE_FILE_ID, variable: 'KEYSTORE_FILE')
                ]) {
                    dir('android') {
                        sh '''
                            set -e
                            echo "=== Building Android APK ==="
                             ./gradlew clean assembleRelease \
                               -PMYAPP_UPLOAD_STORE_FILE=$KEYSTORE_FILE \
                               -PversionCode=$APP_BUILD_NUMBER \
                               -PversionName="1.0.${APP_BUILD_NUMBER}" \
                               --no-daemon
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'android/app/build/outputs/apk/release/*.apk', allowEmptyArchive: true, fingerprint: true
        }
        success {
            echo "Android staging build #${env.BUILD_NUMBER} completed successfully. The build is exported to: android/app/build/outputs/apk/release/app-release.apk"
            sh 'cp android/app/build/outputs/apk/release/app-release.apk /Users/niravpatel/Downloads/app-release.apk'
        }
        failure {
            echo "Android staging build #${env.BUILD_NUMBER} failed. Check the console output for details."
        }
    }
}
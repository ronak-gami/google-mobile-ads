pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
    }

    // Defining this here (instead of only in the Jenkins UI) means the dropdown
    // travels with the Jenkinsfile: any job/clone pointed at this file gets the
    // same "which environment" prompt automatically, no manual per-job setup.
    // NOTE: the very first build after this change won't show the prompt yet —
    // Jenkins has to read this file once via SCM before it registers the
    // parameter. From the 2nd build onward, "Build with Parameters" will show it.
    parameters {
        choice(
            name: 'BUILD_ENV',
            choices: ['staging', 'local', 'production', 'none'],
            description: 'Select the environment configuration to inject (.env file). Choose "none" to build with no env file.'
        )
    }

    environment {
        ANDROID_HOME     = "${HOME}/Library/Android/sdk"
        ANDROID_SDK_ROOT = "${HOME}/Library/Android/sdk"
        JAVA_HOME = "/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home"
        PATH = "${HOME}/.nvm/versions/node/v24.14.0/bin:/opt/homebrew/bin:/usr/local/bin:${JAVA_HOME}/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:/usr/bin:/bin:/usr/sbin:/sbin"
        LANG = 'en_US.UTF-8'

        // Keystore file credential uploaded in Jenkins
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
                    cd android
                    ./gradlew clean
                    rm -rf build .cxx
                    cd ..
                '''
            }
        }

        stage('Inject Environment Config') {
            steps {
                script {
                    def envType = params.BUILD_ENV

                    if (!envType || envType == 'none') {
                        echo "BUILD_ENV = 'none' — skipping .env injection."
                        return
                    }

                    def credentialId = "google-mobile-ads-env-${envType}"
                    echo "Injecting env config for '${envType}' using credential '${credentialId}'..."

                    // No try/catch here on purpose: if the matching credential is
                    // missing, the build now FAILS instead of silently shipping an
                    // app with no/stale env config. Shipping the wrong config quietly
                    // is worse than a loud failure.
                    withCredentials([file(credentialsId: credentialId, variable: 'ENV_FILE')]) {
                        sh """
                            cp \$ENV_FILE .env
                            cp \$ENV_FILE .env.${envType}
                        """
                    }
                    echo "Injected .env and .env.${envType}"
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

        stage('Build Android APK') {
            steps {
                withCredentials([
                    file(credentialsId: env.ANDROID_KEYSTORE_FILE_ID, variable: 'KEYSTORE_FILE')
                ]) {
                    dir('android') {
                        sh '''
                            set -e
                            echo "=== Building Android APK ($BUILD_ENV) ==="
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
            echo "Android ${params.BUILD_ENV} build #${env.BUILD_NUMBER} completed successfully. APK: android/app/build/outputs/apk/release/app-release.apk"
            // Convenience copy for your local Mac only. Only ever works if this
            // build happens to land on niravpatel's machine — which isn't
            // guaranteed on 'agent any'. Wrapped so it can't fail the build.
            sh '''
                if [ -d "/Users/niravpatel/Downloads" ]; then
                    cp android/app/build/outputs/apk/release/app-release.apk /Users/niravpatel/Downloads/app-release.apk || true
                fi
            '''
        }
        failure {
            echo "Android ${params.BUILD_ENV} build #${env.BUILD_NUMBER} failed. Check the console output for details."
        }
    }
}
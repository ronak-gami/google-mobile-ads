pipeline {
    // iOS builds require macOS, so pin this to a labeled macOS agent that has
    // Android SDK + Xcode/CocoaPods installed, rather than 'agent any'.
    // Add this label to your Mac node in Jenkins (Manage Nodes > your node > Labels),
    // or change the label below to match an existing one.
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
    }

    environment {
        // NODE_ENV=production is required for RN/Metro to produce an optimized
        // release build (strips dev warnings, enables prod code paths).
        // APP_ENV distinguishes which backend/config to point at.
        NODE_ENV = 'production'
        APP_ENV  = 'staging'

        // Only a keystore FILE credential exists in Jenkins right now.
        // Store password / key alias / key password are therefore being read by
        // Gradle from android/gradle.properties (or wherever your signingConfig
        // points) — see the note on the build stage below about what that means.
        ANDROID_KEYSTORE_FILE_ID = 'google-mobile-ads-keystore-file' // Secret file

        ANDROID_HOME     = "${HOME}/Library/Android/sdk"
        ANDROID_SDK_ROOT  = "${HOME}/Library/Android/sdk"

        // VERIFY this path matches the JDK actually installed on your agent
        // (check with: /usr/libexec/java_home -V). This is a guess based on a
        // typical Homebrew install and MUST be confirmed before first run.
        JAVA_HOME = "/opt/homebrew/opt/openjdk@17"

        // VERIFY this nvm node path exists on the agent you land on.
        PATH = "${HOME}/.nvm/versions/node/v24.14.0/bin:/opt/homebrew/bin:/usr/local/bin:${JAVA_HOME}/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:/usr/bin:/bin:/usr/sbin:/sbin"

        LANG = 'en_US.UTF-8'
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

                    echo "=== Installing npm packages (resilient install) ==="
                    npm install --legacy-peer-deps

                    echo "=== Cleaning Android build ==="
                    cd android && ./gradlew clean && cd ..
                '''
            }
        }

        stage('Inject Staging Config') {
            steps {
                sh '''
                    set -e
                    cat > .env << EOF
API_URL=https://api-staging.example.com
APP_ENV=staging
EOF
                '''
            }
        }

        stage('Set Build Version') {
            steps {
                script {
                    env.APP_BUILD_NUMBER = env.BUILD_NUMBER
                }
            }
        }

        // NOTE: only the keystore FILE is injected here. storePassword / keyAlias /
        // keyPassword are NOT passed in — which means Gradle is picking them up from
        // android/gradle.properties (or hardcoded in android/app/build.gradle).
        // Practically that means those secrets live in plain text in your repo/agent.
        // Functional, but not ideal. See the message below the file for how to close
        // this gap later — it's just 3 more credentials + 3 more lines here.
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
            echo "Android staging build #${env.BUILD_NUMBER} completed successfully. APK is available in Jenkins artifacts."
        }
        failure {
            echo "Android staging build #${env.BUILD_NUMBER} failed. Check the console output for details."
        }
        cleanup {
            cleanWs()
        }
    }
}
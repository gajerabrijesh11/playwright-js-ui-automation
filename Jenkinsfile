pipeline {
    agent any
    
    tools {
        // તારા જેનકિન્સમાં NodeJS પ્લગઇનમાં જે નામ આપેલું હોય એ અહિયાં લખવું
        nodejs 'NodeJS' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ગિટહબ પરથી લેટેસ્ટ કોડ ખેંચવા માટે
                git branch: 'main', url: 'https://github.com/gajerabrijesh11/playwright-js-ui-automation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // જો તારું જેનકિન્સ વિન્ડોઝ પર ચાલતું હોય તો 'sh' ની જગ્યાએ 'bat' વાપરવું
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // ટેસ્ટ પત્યા પછી HTML રિપોર્ટ જેનકિન્સના ડેશબોર્ડ પર બતાવવા માટે
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
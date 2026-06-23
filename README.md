# Playwright JS UI Automation Framework

This is a test automation framework built using Playwright with JavaScript.
It is used to test the EventHub web application
(https://eventhub.rahulshettyacademy.com/login).

The framework covers three types of testing in one place:

1. UI testing (testing the web pages in the browser)
2. API testing (testing the backend APIs directly)
3. BDD testing (writing tests in plain English using Cucumber style)

It also supports Data Driven Testing (DDT), runs on three browsers
(Chromium, Firefox, WebKit), and is connected to CI/CD tools
(GitHub Actions, Jenkins, and Azure DevOps).

This README explains the project from the very basic steps to the advanced steps,
so that any new person can read it and understand the full project flow.


## Table of Contents

1. What This Project Does
2. Tools and Technologies Used
3. Project Folder Structure
4. How to Install (Setup from Zero)
5. How to Run Tests (All Commands)
6. UI Testing Explained
7. API Testing Explained
8. Data Driven Testing (DDT) Explained
9. BDD Testing Explained
10. Page Object Model (POM) Explained
11. Test Data and Utilities
12. Reports, Trace, Screenshot, and Video
13. CI/CD - GitHub Actions
14. CI/CD - Jenkins
15. CI/CD - Azure DevOps
16. Configuration File Explained


## 1. What This Project Does

The project tests a website called EventHub. EventHub is a sample application
where a user can register, login, browse events, and book events.

This framework automatically tests these features so that we do not have to
test them by hand every time. We write the test once, and it can run again and
again on different browsers and on CI servers.


## 2. Tools and Technologies Used

- Playwright: The main automation tool that controls the browser.
- JavaScript: The programming language used to write the tests.
- Node.js: Required to run Playwright and JavaScript.
- playwright-bdd: A library that allows writing tests in BDD (Cucumber) style.
- GitHub Actions: Runs tests automatically on GitHub.
- Jenkins: Runs tests on a Jenkins server.
- Azure DevOps: Runs tests on an Azure pipeline.


## 3. Project Folder Structure

```
playwright-js-ui-automation/
|
|-- Pages/                       Page Object Model classes (locators and actions)
|     |-- LoginPage.js
|     |-- RegisterPage.js
|     |-- BrowseEventsPage.js
|     |-- BookeventPage.js
|
|-- tests/                       UI test files
|     |-- Login.spec.js
|     |-- Register.spec.js
|     |-- BrowseEvents.spec.js
|     |-- Bookevent.spec.js
|     |-- API_tests/             API test files
|           |-- auth.setup.js    Creates login token before API tests run
|           |-- Login.spec.js
|           |-- RegisterUser.spec.js
|           |-- CurrentUser.spec.js
|           |-- BrowsEvents.spec.js
|
|-- BDD_Layer/                   BDD (Cucumber style) tests
|     |-- features/
|     |     |-- login.feature    Test steps written in plain English
|     |-- Steps/
|           |-- login.steps.js   The code behind each English step
|
|-- .features-gen/               Auto-generated files from BDD (do not edit by hand)
|
|-- test-data/                   External test data files
|     |-- user-data.json         Login data, dropdown data, search data
|     |-- token-state.json       Saved login token for API tests
|
|-- utils/
|     |-- GenerateData.js        Helper to create random test data
|
|-- playwright-report/           HTML report after the test run
|-- test-results/                Trace, screenshot, and video files
|
|-- .github/workflows/
|     |-- playwright.yml         GitHub Actions pipeline
|
|-- Jenkinsfile                  Jenkins pipeline
|-- azure-pipelines.yml          Azure DevOps pipeline
|
|-- playwright.config.js         Main Playwright configuration
|-- package.json                 Project dependencies
|-- README.md                    This file
```


## 4. How to Install (Setup from Zero)

Follow these steps if you are setting up the project for the first time.

Step 1: Install Node.js
Download and install Node.js from https://nodejs.org (LTS version is fine).
To check it is installed, run these commands:

```
node -v
npm -v
```

Step 2: Get the project
Clone the project from GitHub:

```
git clone https://github.com/gajerabrijesh11/playwright-js-ui-automation.git
cd playwright-js-ui-automation
```

Step 3: Install project dependencies
This reads package.json and downloads all required libraries:

```
npm install
```

Step 4: Install Playwright browsers
Playwright needs its own copy of the browsers (Chromium, Firefox, WebKit):

```
npx playwright install
```

If you are on a CI machine or Linux, you may also need system dependencies:

```
npx playwright install --with-deps
```

After these four steps, the project is ready to run.


## 5. How to Run Tests (All Commands)

Below are all the common commands. You can copy and paste them.

Run all tests:

```
npx playwright test
```

Run tests with the browser visible (headed mode):

```
npx playwright test --headed
```

Run a single test file:

```
npx playwright test tests/Login.spec.js
```

Run a single test file in a specific browser:

```
npx playwright test tests/Login.spec.js --project=chromium
```

Run all tests only in Firefox:

```
npx playwright test --project=firefox
```

Run all tests only in WebKit (Safari engine):

```
npx playwright test --project=webkit
```

Run only the API tests:

```
npx playwright test --project=api_tests
```

Run only the BDD tests:

```
npx playwright test --project=bdd-tests
```

Run a test by its title (use part of the test name):

```
npx playwright test -g "login successfully"
```

Run in debug mode (step through the test):

```
npx playwright test --debug
```

Open the Playwright test UI (interactive mode, very helpful for beginners):

```
npx playwright test --ui
```

Use a simpler line reporter instead of the HTML report:

```
npx playwright test --reporter=line
```

Shortcut commands (npm scripts)
To make these easier, short npm scripts are added in package.json. You can use
the short version instead of typing the full command every time.

```
npm test                Run all tests
npm run test:headed     Run all tests with the browser visible
npm run test:ui         Open the interactive Playwright UI
npm run test:debug      Run in debug mode (step through the test)
npm run test:chromium   Run all tests in Chromium only
npm run test:firefox    Run all tests in Firefox only
npm run test:webkit     Run all tests in WebKit only
npm run test:api        Run only the API tests
npm run test:bdd        Run only the BDD tests
npm run report          Open the HTML report
```


## 6. UI Testing Explained

UI tests open a real browser, go to the website, and check that the pages
work correctly. For example, the login test fills in the email and password,
clicks the Sign In button, and checks that the home page is shown.

The UI test files are inside the `tests` folder:

- Login.spec.js - tests the login screen
- Register.spec.js - tests the registration screen
- BrowseEvents.spec.js - tests searching and filtering events
- Bookevent.spec.js - tests booking an event

UI tests run on three browsers: Chromium, Firefox, and WebKit.
This is set up in the configuration file (see section 16).


## 7. API Testing Explained

API tests do not open a browser. They send requests directly to the backend
server and check the response. This is faster than UI testing and is good for
checking the backend logic.

The API tests are inside `tests/API_tests`.

Important file: `auth.setup.js`
Before the API tests run, this file logs in using the API, gets a login token,
and saves it to `test-data/token-state.json`. The other API tests then use this
saved token so they do not have to log in again every time.

This setup step is controlled in the configuration file. The `api_tests` project
depends on the `setup` project, which means the setup always runs first.

To run only the API tests:

```
npx playwright test --project=api_tests
```


## 8. Data Driven Testing (DDT) Explained

Data Driven Testing means we keep the test data separate from the test code.
The same test runs many times with different sets of data.

In this project, the test data is stored in `test-data/user-data.json`.
For example, there is a list called `DDTLogindata` that has multiple login
scenarios (valid login, invalid email, and so on).

In `tests/Login.spec.js`, the code loops over this list and creates one test
for each data row:

```
for (const data of userdata.DDTLogindata) {
    test(`User login with DDTdata ${data.scenario}`, async ({ page }) => {
        // login with data.email and data.password
        // then check the correct result
    });
}
```

Benefit: To add a new test case, we only add a new row in the JSON file.
We do not need to write new code.


## 9. BDD Testing Explained

BDD means Behavior Driven Development. The test steps are written in plain
English so that even non-technical people (like a manager or a business analyst)
can read and understand them.

This project uses the `playwright-bdd` library.

There are two parts:

1. Feature file: `BDD_Layer/features/login.feature`
   This is written in Gherkin language (Given, When, Then). Example:

```
Scenario: Successful login with valid credentials
    Given I am on the EventHub login page
    When I enter email "testbg@gmail.com" and password "gBRij@26"
    And I click on the Login button
    Then I should be logged in successfully
```

2. Step definition file: `BDD_Layer/Steps/login.steps.js`
   This is the actual code that runs behind each English line. Example:

```
Given('I am on the EventHub login page', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
});
```

When you run the BDD tests, the `playwright-bdd` library reads the feature file,
matches each English line to its step code, and creates runnable test files
inside the `.features-gen` folder automatically. You should not edit the files
in `.features-gen` by hand.

To run only the BDD tests:

```
npx playwright test --project=bdd-tests
```


## 10. Page Object Model (POM) Explained

Page Object Model is a design pattern that keeps the page details (locators and
actions) in separate class files, away from the test files.

Each web page has its own class inside the `Pages` folder. For example,
`LoginPage.js` holds the email box, password box, and the Sign In button,
plus a `login()` action:

```
class LoginPage {
    constructor(page) {
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signinButton = page.getByRole('button', { name: 'Sign In' });
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }
}
```

The test file then just calls `loginpage.login(email, password)`.

Benefit: If a locator changes on the website, we only update it in one place
(the page class), and all tests keep working.


## 11. Test Data and Utilities

Test data folder: `test-data`
- `user-data.json` holds valid user details, dropdown options, search keywords,
  and the DDT login data.
- `token-state.json` holds the login token created by the API setup step.

Utilities folder: `utils`
- `GenerateData.js` creates random test data, such as a random email, random
  password, random full name, and random phone number. This is useful for the
  registration tests, where we need a new unique user every time.


## 12. Reports, Trace, Screenshot, and Video

After a test run, Playwright collects useful information that helps us see what
happened, especially when a test fails.

HTML Report
The main report is an HTML report. To open it after a run:

```
npx playwright show-report
```

This opens a web page that shows which tests passed, which failed, and the
details of each step.

Trace
A trace is a full recording of the test, including each action, the page state,
and network calls. In this project, the trace is saved only when a test fails
and is retried (`trace: 'retain-on-failure'`).
To open a trace file:

```
npx playwright show-trace test-results/path-to-trace.zip
```

Screenshot
A screenshot (a picture of the screen) is saved when a test fails, so we can
see what the page looked like at the moment of failure.

Video
A video recording of the test is also saved on failure
(`video: 'retain-on-failure'`), so we can watch what happened step by step.

All of these failure files are saved inside the `test-results` folder.
These settings are controlled in the configuration file (section 16).


## 13. CI/CD - GitHub Actions

GitHub Actions runs the tests automatically on GitHub.
The pipeline file is `.github/workflows/playwright.yml`.

It runs in these situations:
- When code is pushed to the main or master branch.
- When a pull request is made to main or master.
- Every day at midnight (a scheduled run using cron `0 0 * * *`).

The steps it performs:
1. Check out the code.
2. Install Node.js.
3. Install dependencies with `npm ci`.
4. Install Playwright browsers.
5. Run all tests with `npx playwright test`.
6. Upload the HTML report so it can be downloaded from GitHub (kept for 30 days).


## 14. CI/CD - Jenkins

Jenkins runs the tests on a Jenkins server.
The pipeline file is `Jenkinsfile`.

It needs the NodeJS plugin set up in Jenkins (named 'NodeJS').

The stages it performs:
1. Checkout Code: pulls the latest code from GitHub (main branch).
2. Install Dependencies: runs `npm ci` and installs Playwright browsers.
3. Run Playwright Tests: runs `npx playwright test`.

After the run, it publishes the HTML report to the Jenkins dashboard so it can
be viewed there.

Note: The Jenkinsfile uses `bat` commands, which means it is set up for a
Windows Jenkins agent. On a Linux agent, these would be changed to `sh`.


## 15. CI/CD - Azure DevOps

Azure DevOps runs the tests on an Azure pipeline.
The pipeline file is `azure-pipelines.yml`.

It runs when code is pushed to the main branch.

The steps it performs:
1. Install Node.js (version 20).
2. Install dependencies with `npm ci`.
3. Install Playwright browsers.
4. Run all tests with `npx playwright test` (with CI mode turned on).
5. Publish the HTML report as a pipeline artifact so it can be downloaded.


## 16. Configuration File Explained

The main configuration file is `playwright.config.js`. This file controls how
all the tests run. The important settings are:

- testDir: The main test folder is `./tests`.
- fullyParallel: Tests run in parallel to save time.
- retries: On CI, a failed test is retried 2 times. On local, no retry.
- workers: On CI, 4 workers run at a time. On local, 2 workers.
- reporter: The report type is HTML.
- baseURL: The starting website address.
- trace: Saved on failure (`retain-on-failure`).
- screenshot: Saved on failure.
- video: Saved on failure (`retain-on-failure`).

Projects (each project is a separate run setup):
- setup: Runs `auth.setup.js` first to create the login token.
- chromium, firefox, webkit: The three browsers for UI tests.
  These skip the API tests and the generated BDD files.
- api_tests: Runs only the API tests, and depends on the setup project.
- bdd-tests: Runs the BDD (Cucumber style) tests.

This is why the project can run UI, API, and BDD tests separately or together,
all from one configuration.


## Quick Start Summary

For someone who just wants to run the project quickly:

```
git clone https://github.com/gajerabrijesh11/playwright-js-ui-automation.git
cd playwright-js-ui-automation
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

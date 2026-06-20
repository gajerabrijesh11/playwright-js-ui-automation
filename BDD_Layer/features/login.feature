Feature: User Login Functionality

  Scenario: Successful login with valid credentials
    Given I am on the EventHub login page
    When I enter email "testbg@gmail.com" and password "gBRij@26"
    And I click on the Login button
    Then I should be logged in successfully

  Scenario: Unsuccessful login with Invalid email
    Given I am on the EventHub login page
    When I enter email "testg@gmail.com" and password "gBRij@26"
    And I click on the Login button
    Then I should see error msg

  Scenario: Unsuccessful login with Invalid password
    Given I am on the EventHub login page
    When I enter email "testbg@gmail.com" and password "gBRij@"
    And I click on the Login button
    Then I should see error msg
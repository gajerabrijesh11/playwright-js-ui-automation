// Generated from: BDD_Layer\features\login.feature
import { test } from "playwright-bdd";

test.describe('User Login Functionality', () => {

  test('Successful login with valid credentials', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the EventHub login page', null, { page }); 
    await When('I enter email "testbg@gmail.com" and password "gBRij@26"', null, { page }); 
    await And('I click on the Login button', null, { page }); 
    await Then('I should be logged in successfully', null, { page }); 
  });

  test('Unsuccessful login with Invalid email', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the EventHub login page', null, { page }); 
    await When('I enter email "testg@gmail.com" and password "gBRij@26"', null, { page }); 
    await And('I click on the Login button', null, { page }); 
    await Then('I should see error msg', null, { page }); 
  });

  test('Unsuccessful login with Invalid password', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the EventHub login page', null, { page }); 
    await When('I enter email "testbg@gmail.com" and password "gBRij@"', null, { page }); 
    await And('I click on the Login button', null, { page }); 
    await Then('I should see error msg', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('BDD_Layer\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the EventHub login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I enter email \"testbg@gmail.com\" and password \"gBRij@26\"","stepMatchArguments":[{"group":{"start":14,"value":"\"testbg@gmail.com\"","children":[{"start":15,"value":"testbg@gmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"gBRij@26\"","children":[{"start":47,"value":"gBRij@26","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I click on the Login button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I should be logged in successfully","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I am on the EventHub login page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I enter email \"testg@gmail.com\" and password \"gBRij@26\"","stepMatchArguments":[{"group":{"start":14,"value":"\"testg@gmail.com\"","children":[{"start":15,"value":"testg@gmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":45,"value":"\"gBRij@26\"","children":[{"start":46,"value":"gBRij@26","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I click on the Login button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should see error msg","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":21,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given I am on the EventHub login page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I enter email \"testbg@gmail.com\" and password \"gBRij@\"","stepMatchArguments":[{"group":{"start":14,"value":"\"testbg@gmail.com\"","children":[{"start":15,"value":"testbg@gmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"gBRij@\"","children":[{"start":47,"value":"gBRij@","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I click on the Login button","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should see error msg","stepMatchArguments":[]}]},
]; // bdd-data-end
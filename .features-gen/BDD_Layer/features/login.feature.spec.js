// Generated from: BDD_Layer\features\login.feature
import { test } from "playwright-bdd";

test.describe('User Login Functionality', () => {

  test('Successful login with valid credentials', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the EventHub login page', null, { page }); 
    await When('I enter email "testbg@gmail.com" and password "gBRij@26"', null, { page }); 
    await And('I click on the Login button', null, { page }); 
    await Then('I should be logged in successfully', null, { page }); 
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
]; // bdd-data-end
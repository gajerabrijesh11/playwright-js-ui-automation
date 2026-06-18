// This test for handling 2 pages, Parant page and child page.

const { test, expect } = require('@playwright/test');

test('handle parant and child page', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const linkname = page.locator("[href*='documents-request']");
    // const [newpage1] = await Promise.all([
    //     context.waitForEvent('page'),
    //     linkname.click()
    // ])
    // await expect(newpage1).toHaveTitle("RS Academy");


    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        linkname.click(),
    ])  //when we need to run set of steps in paraller and wait for result then we use method Promise.all. In this method we can put all the steps in array.
    const text = await newPage.locator(".red").textContent();
    const domain = text.split("@");
    const email = domain[1].split(" ")[0]
    console.log(email);
    
    await page.locator("#username").type(email);
    await page.pause();
    console.log(await page.locator("#username").textContent());
    // console.log(text);
})
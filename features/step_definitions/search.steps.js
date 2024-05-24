const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.page.close();
  }
});

Given("User on website", async function () {
  return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
    setTimeout: 60000,
  });
});

When("user select time movie", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(7)");
  await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2)"
  );
});

When("user select other time movie", { timeout: 60000 }, async function () {
  await clickElement(this.page, "body > nav > a:nth-child(7)");
  await clickElement(
    this.page,
    "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li:nth-child(2)"
  );
});

When("user select place and click button", async function () {
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(2)");
  await this.page.waitForTimeout(1500);
  await clickElement(this.page, "button");
});

When("user select places and click button", async function () {
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(1)");
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(5)");
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(3)");
  await clickElement(this.page, "button");
});

When("user select disabled places", async function () {
  return await clickElement(this.page, ".buying-scheme__chair_taken");
});

Then("we get ticket", async function () {
  const actual = await getText(this.page, "body > main > section > header");
  expect(actual).contain("Вы выбрали билеты:");
});

Then("we can`t click", async function () {
  const actual = await this.page.$eval("button", (button) => button.disabled);
  expect(actual).true;
});

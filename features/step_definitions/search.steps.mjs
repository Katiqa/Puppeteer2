import chai from "chai";
const puppeteer = require("puppeteer");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  page = await browser.newPage();
  this.browser;
  this.page;
});

After(async function () {
  if (this.browser) {
    this.page.close();
  }
});

Given("User on {string}", async function (string) {
  return await this.page.goto(
    { string },
    {
      setTimeout: 60000,
    }
  );
});

When("user select time movie", async function () {
  await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2)"
  );
});

When("user select other time movie", async function () {
  await clickElement(
    this.page,
    "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li:nth-child(2)"
  );
});

When("user select place and click button", async function () {
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(1)");
  await clickElement(this.page, "button");
});

When("user select places and click button", async function () {
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(1)");
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(5)");
  await clickElement(this.page, "div:nth-child(6) > span:nth-child(3)");
  await clickElement(this.page, "button");
});

When("user select disabled places", async function () {
  await clickElement(this.page, "div:nth-child(1) > span:nth-child(1)");
});

Then("we get ticket", async function () {
  const actual = await getText(this.page, "h2");
  expect(actual).toContain("Вы выбрали билеты:");
});

Then("we can`t click", async function () {
  const actual = await this.page.$eval("button", (button) => button.disabled);
  expect(actual).toBe(true);
});

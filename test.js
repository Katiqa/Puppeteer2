const { clickElement, getText } = require("./lib/commands");
jest.setTimeout(10000);
let page;

describe("Tests cinema", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });
  afterEach(() => {
    page.close();
  });

  test("The only one place", async () => {
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2)"
    );
    await clickElement(page, "div:nth-child(6) > span:nth-child(1)");
    await clickElement(page, "button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("The some place", async () => {
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2)"
    );

    await clickElement(page, "div:nth-child(6) > span:nth-child(1)");
    await clickElement(page, "div:nth-child(6) > span:nth-child(4)");
    await clickElement(page, "div:nth-child(6) > span:nth-child(7)");
    await clickElement(page, "button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("The unviable place", async () => {
    await clickElement(
      page,
      "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li:nth-child(2)"
    );
    await clickElement(page, "div:nth-child(1) > span:nth-child(1)");
    const actual = await page.$eval("button", (button) => button.disabled);
    expect(actual).toBe(true);
  });
});

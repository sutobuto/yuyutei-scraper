import { expect } from "@playwright/test";
import { getSharedContext } from '../config/browser.js';

export const getCardNameJP = async (cardnameEN) => {
    // initialize browser
    const context = await getSharedContext();
    const page = await context.newPage();

    // construct the url
    const cardnameENmod = cardnameEN.replaceAll(" ", "_");
    const url = `https://yugipedia.com/wiki/${cardnameENmod}`;

    await page.goto(url);

    var cardnameJP;
    const checkLang = await page.locator('span[lang="ja-Hrkt"]').isVisible();

    // check if card contains separate kana translation
    if (checkLang) {
        // get kana span
        await expect(page.locator('span[lang="ja-Hrkt"]')).toBeVisible();
        cardnameJP = await page.locator('span[lang="ja-Hrkt"]').innerText();
    } else {
        // get original span
        await expect(
            page.getByRole("definition").locator('span[lang="ja"]'),
        ).toBeVisible();
        cardnameJP = await page
            .getByRole("definition")
            .locator('span[lang="ja"]')
            .innerText();
    }

    // const checkLang = await page.locator('span[lang="ja-Jpan"]').isVisible();

    // // check if card contains ruby text
    // if(checkLang) {
    //     // get base kana without ruby text
    //     await expect(page.locator('span[lang="ja-Jpan"]')).toBeVisible();
    //     cardnameJP = await page.locator('span[lang="ja-Jpan"]').innerText();
    // } else {
    //     // get original kana
    //     await expect(page.getByRole('definition').locator('span[lang="ja"]')).toBeVisible();
    //     cardnameJP = await page.getByRole('definition').locator('span[lang="ja"]').innerText();
    // }
    2;
    await context.close();

    return cardnameJP;
};

export const getCardNameEN = async (setID) => {
    // initialize browser
    const context = await getSharedContext();
    const page = await context.newPage();

    const url = `https://yugipedia.com/wiki/${setID}`;
    await page.goto(url);

    const cardnameEN = await page.locator(".firstHeading").innerText();

    await page.close();

    return cardnameEN;
};

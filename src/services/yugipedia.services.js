import { get } from 'node:http';
import { expect } from '@playwright/test';
import { getBrowser } from '../config/browser.js';

export const getCardNameJP = async (cardnameEN) => {
    // initialize browser
    const userAgent = 
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    const browser = getBrowser();
    const context = await browser.newContext({ userAgent, bypassCSP: true });
    const page = await context.newPage();

    // construct the url
    const cardnameENmod = cardnameEN.replaceAll(' ', '_');
    const url = `https://yugipedia.com/wiki/${cardnameENmod}`
    
    await page.goto(url);

    var cardnameJP;
    const checkLang = await page.locator('span[lang="ja-Jpan"]').isVisible();

    // check if card contains ruby text
    if(checkLang) {
        // get base kana without ruby text
        await expect(page.locator('span[lang="ja-Jpan"]')).toBeVisible();
        cardnameJP = await page.locator('span[lang="ja-Jpan"]').innerText();
    } else {
        // get original kana
        await expect(page.getByRole('definition').locator('span[lang="ja"]')).toBeVisible();
        cardnameJP = await page.getByRole('definition').locator('span[lang="ja"]').innerText();
    }

    await context.close();

    return cardnameJP;
}
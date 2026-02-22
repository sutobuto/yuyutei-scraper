import { test, expect } from '@playwright/test'

test('Yugipedia JP Card Name Getter', async ({page}) => {
    await page.goto('https://yugipedia.com/wiki/Elfnote_Regina');

    const cardnameEN = await page.locator('h1[class="firstHeading"]').innerText();

    const checkLang = await page.locator('span[lang="ja-Jpan"]').isVisible();
    var cardnameJP;
    if(checkLang) {
        cardnameJP = await page.locator('span[lang="ja-Jpan"]').innerText();
    } else {
        cardnameJP = await page.getByRole('definition').locator('span[lang="ja"]').innerText();
    }


    console.log('EN Name:', cardnameEN);
    console.log('JP Name:', cardnameJP);

    await page.close();
})
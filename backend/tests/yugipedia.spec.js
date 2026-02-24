import { expect, test } from '@playwright/test'

test('Yugipedia JP Card Name Getter', async ({page}) => {

    const cardname = "Diabellstar the Black Witch".replaceAll(' ', '_');
    const cardURL = `https://yugipedia.com/wiki/${cardname}`;
    console.log(cardURL);

    await page.goto(cardURL);

    const cardnameEN = await page.getByRole('heading', {level: 1}).innerText();
    
    var cardnameJP;
    const checkLang = await page.locator('span[lang="ja-Jpan"]').isVisible();
    await page.screenshot({path: "test.png", fullPage: true});
    if(checkLang) {
        await expect(page.locator('span[lang="ja-Jpan"]')).toBeVisible();
        cardnameJP = await page.locator('span[lang="ja-Jpan"]').innerText();
    } else {
        await expect(page.getByRole('definition').locator('span[lang="ja"]')).toBeVisible();
        cardnameJP = await page.getByRole('definition').locator('span[lang="ja"]').innerText();
    }


    console.log('EN Name:', cardnameEN);
    console.log('JP Name:', cardnameJP);

    await page.close();
})
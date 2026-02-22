import { test } from '@playwright/test'

test('Yugipedia JP Card Name Getter', async ({page}) => {

    const cardname = "Diabellze the White Witch".replaceAll(' ', '_');
    const cardURL = `https://yugipedia.com/wiki/${cardname}`;
    console.log(cardURL);

    await page.goto(cardURL);

    const cardnameEN = await page.getByRole('heading', {level: 1}).innerText();
    
    var cardnameJP;
    const checkLang = await page.locator('span[lang="ja-Jpan"]').isVisible();
    if(checkLang) {
        cardnameJP = await page.locator('span[lang="ja-Jpan"]').innerText();
    } else {
        cardnameJP = await page.getByRole('definition').locator('span[lang="ja"]').innerText();
    }


    console.log('EN Name:', cardnameEN);
    console.log('JP Name:', cardnameJP);

    await page.close();
})
import * as cheerio from 'cheerio';

export const getPrice = async (name) => {
    // initialize browser
    const url = `https://yuyu-tei.jp/sell/ygo/s/search?search_word=${name}`;
    console.log(url);
    const $ = await cheerio.fromURL(url);
    
    const $rarities = $('span.py-2');
    const $rarityCardGroups = $('div#card-list3')
    
    const rarities = [];
    const data = [];

    // TODO: seperate alternate art pricing
    $rarityCardGroups.each((i, rarity) => {
        const $cardGroup = $(rarity).find('div.card-product');
        $cardGroup.each((i, card) => {
            console.log($(card).find('span').text());
            data.push({ 
                rarity: $(rarity).find('span.py-2').text(), 
                setID: $(card).find('span').text(), 
                yenPrice: $(card).find('strong').text().replace(/\n/g, '').replace('円', '').replace(' ', '')
            });
        })
    })

    return data;
}
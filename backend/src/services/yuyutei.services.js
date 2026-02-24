import * as cheerio from 'cheerio';

export const getPrice = async (name) => {
    // initialize browser
    const url = `https://yuyu-tei.jp/sell/ygo/s/search?search_word=${name}`;
    console.log(url);
    const $ = await cheerio.fromURL(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    });
    
    const $rarityCardGroups = $('div#card-list3')
    const data = [];

    // TODO: seperate alternate art pricing
    $rarityCardGroups.each((i, rarity) => {
        const $cardGroup = $(rarity).find('div.card-product');
        $cardGroup.each((i, card) => {
            console.log($(card).find('span').text());

            var isAltArt = false;
            const yenPrice = $(card).find('strong').text().replaceAll(',', '').replaceAll(/\n/g, '').replace('円', '').replaceAll(' ', '');
            const phpPrice = yenPrice * 0.37;

            const $cardname = $(card).find('h4').text();
            if($cardname.includes('(イラスト違い版)')) isAltArt = true;

            data.push({ 
                name: $cardname,
                rarity: $(rarity).find('span.py-2').text(), 
                setID: $(card).find('span').text(), 
                yenPrice: parseInt(yenPrice, 10),
                phpPrice: phpPrice,
                isAltArt: isAltArt
            });
        })
    })

    return data;
}
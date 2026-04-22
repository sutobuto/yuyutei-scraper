import * as cheerio from "cheerio";
import { getCardNameEN } from "./yugipedia.services.js";

const namesEN = {};

export const getPrice = async (name) => {
    // initialize browser
    const url = `https://yuyu-tei.jp/sell/ygo/s/search?search_word=${name}`;
    console.log(url);
    const $ = await cheerio.fromURL(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        },
    });

    const $rarityCardGroups = $("div#card-list3").toArray();
    const data = [];

    // TODO: seperate alternate art pricing
    for (const rarity of $rarityCardGroups) {
        const $rarity = $(rarity);
        const rarityname = $rarity.find("span.py-2").text();

        const $cardGroup = $rarity.find("div.card-product").toArray();

        for (const card of $cardGroup) {
            //console.log($(card).find("span").text());
            const $card = $(card);
            const $cardname = $card.find("h4").text();

            const yenPriceStr = $card
                .find("strong")
                .text()
                .replace(/[,\n 円]/g, "");
            const yenPrice = parseInt(yenPriceStr, 10) || 0;
            const phpPrice = yenPrice * 0.37;
            const setID = $(card).find("span").text().trim();

            let cardnameEN;
            const cardnameTrimmed = $cardname.replace(/\(ロゴ無し\)|\(イラスト違い版\)|\(ロゴ有り\)/g, "");
            if (namesEN.hasOwnProperty(cardnameTrimmed)) {
                cardnameEN = namesEN[cardnameTrimmed];
            } else {
                cardnameEN = await getCardNameEN(setID);
                namesEN[cardnameTrimmed] = cardnameEN;
            }

            await data.push({
                nameJP: $cardname,
                nameEN: cardnameEN,
                rarity: rarityname,
                setID: setID,
                yenPrice: yenPrice,
                phpPrice: phpPrice,
                isAltArt:
                    $cardname.includes("(イラスト違い版)") ||
                    $cardname.includes("(ロゴ有り)") ||
                    $cardname.includes("(ロゴ無し)"),
            });
        }
    }
    console.log(namesEN);
    return data;
};

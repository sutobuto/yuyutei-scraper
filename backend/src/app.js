import express from 'express';
import cors from 'cors';
import { getCardNameJP } from './services/yugipedia.services.js';
import { getPrice } from './services/yuyutei.services.js';

const app = express();

app.use(express.json());
app.use(cors());

// endpoint: card fuzzy search
app.get("/search", async (req, res) => {
    const cards = await fuzzySearchCard(req.query.card);
    
    const cardnames = [];
    await cards.data.forEach(card => {
        cardnames.push(card.name);
    })

    console.log(cardnames);
    res.send(cardnames);
})

// endpoint: get japanese card name
app.get("/getJP", async (req, res) => {
    const card = req.query.card;

    const cardnameJP = await getCardNameJP(card);
    console.log(cardnameJP);
    res.json(cardnameJP);
})

// endpoint: get card pricing via yuyutei
app.get("/getPrice", async (req, res) => {
    const card = req.query.card;

    const price = await getPrice(card);
    res.send(price);
})

app.get("/getInfo", async (req, res) => {
    const card = req.query.card;

    const info = await getCardInfo(card);
    res.send(info);
})

const fuzzySearchCard = async (name) => {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`);
        if(!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch(error) {
        console.error('Fetch failed:', error.message);
        console.error('Underlying cause:', error.cause);
    } 
}

const getCardInfo = async (name) => {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`);
        if(!response.ok) {

        }
        const result = await response.json();
        return result
    } catch(error) {
        
    }
}

export default app;
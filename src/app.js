import express from 'express';
import cors from 'cors';
import { getCardNameJP } from './services/yugipedia.services.js';

const app = express();

app.use(express.json());
app.use(cors());

// endpoint: card fuzzy search
app.get("/search", async (req, res) => {
    const cards = await fuzzySearchCard(req.query.card);
    
    const cardnames = [];
    cards.data.forEach(card => {
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
    res.send(cardnameJP);
})

// endpoint: get card pricing via yuyutei
app.get("/getPrice", async (req, res) => {

})

const fuzzySearchCard = async (name) => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`);
    const result = await response.json();
    return result;
}

export default app;
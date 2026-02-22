import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/price", async (req, res) => {
    const cards = await fuzzySearchCard(req.query.cardnameEN);
    
    const cardnames = [];
    cards.data.forEach(card => {
        cardnames.push(card.name);
    })

    await console.log(cardnames);
    res.send(cardnames);
})

app.get("/cardname", (req, res) => {
    const search = req.query.search;

})

const fuzzySearchCard = async (name) => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`);
    const result = await response.json();
    return result;
}

export default app;
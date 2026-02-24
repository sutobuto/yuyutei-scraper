import { start } from 'node:repl';
import app from './app.js';
import { initBrowser } from './config/browser.js';

const PORT = process.env.port || 3000;

const startServer = async () => {
    await initBrowser();
    console.log("Browser initialized");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}

startServer();

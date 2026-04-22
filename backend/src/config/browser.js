import { chromium } from 'playwright';

let browser;

export const initBrowser = async () => {
    browser = await chromium.launch( { headless: true , args: [
            '-disable-blink-features=AutomationControlled',
            '-disable-dev-shm-usage',
            '-no-sandbox',
            '-disable-setuid-sandbox',
            '-disable-web-security',
            '-disable-features=IsolateOrigins,site-per-process',
            '--no-first-run',
            '--remote-allow-origins=*',
        ]
    });
}

export const getBrowser =  () => {
    if(!browser) throw new Error('Browser not initialized');
    return browser;
}
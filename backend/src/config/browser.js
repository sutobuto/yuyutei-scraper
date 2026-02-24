import { chromium } from 'playwright';

let browser;

export const initBrowser = async () => {
    browser = await chromium.launch( { headless: true });
};

export const getBrowser =  () => {
    if(!browser) throw new Error('Browser not initialized');
    return browser;
}
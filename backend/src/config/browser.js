import { chromium } from "playwright-extra";
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

// Add the stealth plugin
chromium.use(stealthPlugin());

let browser;
let sharedContext;

export const initBrowser = async () => {
    if (browser) return browser;

    browser = await chromium.launchPersistentContext('./user_data', {
        headless: false,
        args: [
            '--disable-blink-features=AutomationControlled', 
            '--no-sandbox',
            '--start-maximized'
        ],
    });
    
};

export const getSharedContext = async () => {
    if (!browser) await initBrowser();
    if (sharedContext) return sharedContext;

    sharedContext = browser;

    // Global interceptor to block images/styles/fonts
    await sharedContext.route('**/*', (route) => {
        const type = route.request().resourceType();
        if (['image', 'font', 'stylesheet', 'media'].includes(type)) {
            route.abort();
        } else {
            route.continue();
        }
    });

    return sharedContext;
};

export const getBrowser = () => {
    if (!browser) throw new Error("Browser not initialized");
    return browser;
};

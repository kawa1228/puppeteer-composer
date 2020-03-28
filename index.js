const puppeteer = require('puppeteer');
const config = require('./config.js');

async function main() {
    console.log('-----main----')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await fetchData(page);
    } catch(error) {
        console.log('エラー：', error);
    } finally {
        await browser.close();
    }
}

async function fetchData(page) {
    console.log('-----fetchData----')
    await page.goto(config.TARGET_URL);

    const text = await page.evaluate(() => {
        const composer = {};
        const card = document.querySelector('dl');
        composer['name'] = card.querySelector('dt > a > b').innerText;
        composer['periods'] = card.querySelector('dt > a > span').innerText;
        composer['description'] = card.querySelector('dd').innerText;

        const texts = card.querySelector('dt > a').innerText
        const detail = texts.split(/\n/gi);
        composer['home_city'] = detail[1];
        composer['activity'] = detail[2];

        return composer;
    });
    console.log(text);
}

main();

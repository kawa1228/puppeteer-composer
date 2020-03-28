const puppeteer = require('puppeteer');
const config = require('./config.js');
const csv = require('./csv.js');

async function main() {
    console.log('main ...')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const records = await fetchRecords(page);
        csv.create(records);
    } catch(error) {
        console.log('エラー：', error);
    } finally {
        await browser.close();
    }
}

// puppeteer経由でアクセス
async function fetchRecords(page) {
    console.log('fetchRecords ...')
    await page.goto(config.TARGET_URL);

    const records = await page.evaluate(() => {
        const node = document.querySelectorAll('dl');
        const list = Array.from(node);

        // 必要なデータを配列に格納
        const data = list.map((item) => {
            const obj = {};

            const name = item.querySelector('dt > a > b').innerText;
            const nameSplit = name.split(/（|）/gi);
            obj['name_jp'] = nameSplit[1];
            obj['name_origin'] = nameSplit[0];

            obj['periods'] = item.querySelector('dt > a > span').innerText;
            obj['description'] = item.querySelector('dd').innerText;

            const linkText = item.querySelector('dt > a').innerText
            const linkTextSplit = linkText.split(/\n/gi);
            obj['home_city'] = linkTextSplit[1];
            obj['activity'] = linkTextSplit[2];

            return obj;
        });
        return data;
    });
    return records;
}

main();

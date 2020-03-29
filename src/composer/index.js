const puppeteer = require('puppeteer');
const config = require('../../config.js');
const csv = require('../csv.js');

async function main() {
    console.log('composer ...')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const records = await fetchRecords(page);
        csv.create(records, 'composer');
    } catch(error) {
        console.log('エラー：', error);
    } finally {
        await browser.close();
    }
}

// puppeteer経由でアクセス
async function fetchRecords(page) {
    console.log('fetch records ...')
    await page.goto(config.COMPOSER_URL);

    const records = await page.evaluate(() => {
        const node = document.querySelectorAll('dl');
        const list = Array.from(node);

        // 必要なデータを配列に格納
        const data = list.map((item) => {
            const obj = {};

            // 親となる要素
            const parent = item.querySelector('dt')

            // 名前
            const name = parent.querySelector('a > b').innerText;
            const nameSplit = name.split(/（|）/gi);
            obj['name_jp'] = nameSplit[1];
            obj['name_origin'] = nameSplit[0];

            // 活躍した年、画像、場所、時代、説明
            const linkArea = parent.querySelector('a').innerText;
            const linkAreaSplit = linkArea.split(/\n/gi);
            const active = linkAreaSplit[2];
            const activeSplit = active.split(' 〜 ');
            obj['birth_at'] = activeSplit[0];
            obj['death_at'] = activeSplit[1];

            obj['icon_url'] = parent.querySelector('a > img').src;

            const city = linkAreaSplit[1];
            const citySplit = city.split(/（|）/);
            obj['city_name'] = citySplit[0];
            obj['city_name_origin'] = citySplit[1];

            obj['periods'] = parent.querySelector('a > span').innerText;
            obj['description'] = item.querySelector('dd').innerText;

            return obj;
        });
        return data;
    });
    return records;
}

main();

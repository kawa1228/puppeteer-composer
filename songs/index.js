const puppeteer = require('puppeteer');
const config = require('../config.js');
const csv = require('../csv.js');

async function main() {
    console.log('songs ...')

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const records = await fetchRecords(page);
        csv.create(records, 'songs');
    } catch(error) {
        console.log('エラー：', error);
    } finally {
        await browser.close();
    }
}

// puppeteer経由でアクセス
async function fetchRecords(page) {
    console.log('fetch records ...')
    await page.goto(config.SONG_LIST_URL);

    const records = await page.evaluate(() => {
        const node = document.querySelectorAll('article.eachMusic');
        const list = Array.from(node);

        const data = list.map((item) => {
            const obj = {};

            // 現地名
            const headArea = item.querySelector('a > div.embox2 > h3');
            const headArray = headArea.innerText.split(/：/);
            obj['author_origin'] = headArray[0].trim(); //先頭の空白削除
            obj['name_origin'] = headArray[1];

            const parent = item.querySelector('a > div.embox2 > dl');

            // 曲名
            const title = parent.querySelector('dt > cite').innerText
            obj['name'] = title;
            // 作者
            const infoArea = parent.querySelector('dt > p').innerText;
            const infoArray = infoArea.split(/\n/);
            const info = infoArray[0].split(/（|）/);
            obj['author'] = info[0];
            // 曲説明
            const description = parent.querySelector('dd').innerText;
            obj['description'] = description;
            // タグ
            const tagNode = item.querySelectorAll('.goma > b > a');
            let tags = Array.from(tagNode).map((tag) => tag.innerText)
            obj['tag'] = tags.join(',');

            return obj;
        })

        return data;
    });
    return records;
}

main();

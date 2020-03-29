# Puppeteer Composer

config.jsで指定したサイトurlから取得したデータをcsvに出力

## run
```
$ yarn output
```

## spreadsheet
スプレッドシートで使いたいとき
```
データ > テキストを列に分割
```

## config.js
```
export const COMPOSER_URL = '';
export const SONG_LIST_URL = '';
```

## use
* [puppeteer/puppeteer: Headless Chrome Node.js API](https://github.com/puppeteer/puppeteer)
* [CSV Stringify - Usage](https://csv.js.org/stringify/)

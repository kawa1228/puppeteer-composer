# Puppeteer Composer

config.jsで指定したサイトurlから取得したデータをcsvに出力

## run
```
# 作曲家情報
$ yarn composer

# 曲情報
$ yarn songs
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

const stringifySync = require("csv-stringify/lib/sync");
const fs = require("fs");

// 配列オブジェクトからcsvデータを作成
export const create = (records) => {
    console.log('CSV ...')

    const target = Object.getOwnPropertyNames(records[0])
    const columns = {};
    for (let key of target) {
        columns[key] = key
    }

    // 見出し行を指定
    const csvString = stringifySync(records, {
      header: true,
      columns,
      quoted_string: true
    });

    try {
        // テキストファイルに出力
        fs.writeFileSync("output.txt", csvString);
        console.log('🎉　output complete!');
    }catch(error){
        console.log('エラー：', error);
    }
}

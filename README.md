# Server ライブラリ

タスク管理のための 簡易的な ScriptAPI ライブラリです

[ダウンロード](https://github.com/haya-to8810/Server/releases/download/minecraft/server.js)

> [!NOTE]
> 質問やエラーは以下のDiscordアカウントへ
> .shoborn

## 使い方
1. アドオンをインポートし、ワールドに適応
2. ベータAPI の有効化
3. 使いたいアドオンで、ファイルを インポートする

## Example Code

[Documentation](docs/server.md)

```javascript
import { world } from "@minecraft/server";
import "./utils/server.js";

Server.runIntervalJob(function* () {
    
    for(let i = 0; i < 10; i++) {
        world.sendMessage(`${i} now.`)
        if(i % 3 === 0 ) yield;
    }
},10,{ 
    groupID: "count",
    maxRuns: 20,
    priority: 0
})
```

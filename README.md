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
import ScoreBoarder from "./scoreBoarder.js";

const money = new ScoreBoarder("Money");

for(const player of world.getPlayers()){
    player.onScreenDisplay.setActionBar(`purse: ${money.get(player)}`)
}
```

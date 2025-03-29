# Server ライブラリ

システム管理のための 簡易的な ScriptAPI ライブラリです

[ダウンロード]([https://github.com/](https://github.com/haya-to8810/Server/releases/download/minecraft/server.js))

> [!NOTE]
> 質問やエラーは以下のDiscordアカウントへ
> .shoborn

## 使い方
1. アドオンをインポートし、ワールドに適応
2. ベータAPI の有効化
3. 使いたいアドオンで、ファイルを インポートする
 
##Modules
<details><summary><bold>モジュール一覧を表示</bold></summary>

- tick
  ファイルが読み込まれてからの経過Tick数
  
- TPS
  サーバーのTick Per Second
  
- runInterval
  処理を指定時間ごとに繰り返します
  
- runTimeout
  経過時間後に処理を実行します
  
- runJob
  ジェネレーターを指定時間ごとに進めます

- runIntervalJob
  ジェネレーターを指定時間ごとに進め、
  処理が終わると最初から再実行されます

- clearRun
  登録されている処理を削除します
  
- stop
  特定のグループIDの処理 または 全体の処理 を一時停止します

- start
  特定のグループIDの処理 または 全体の処理 を再開します

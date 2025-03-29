# Server Documentation

## 概要

Minecraft Bedrock の ScriptAPI で タスク の管理をより、
簡易的に操作するために設計されたクラスです。

jsDoc が書かれているので ts-checkを使うことを推奨します。

## Object Methods

## タスク 操作

> **TaskOptions** -
> *{ groupID?: string, maxRuns?: number, priority?: number }*

> **TaskCallback** -
> *{ event: { currentTick: number } }*

### `runInterval(callback,interval?,options?): number`
- **callback** `TaskCallback`
- **[interval]** `number`
- **[options]** `TaskOptions`
指定時間ごとに処理を繰り返し実行します
### `runTimeout(callback,delay?, options?): number`
- **callback** `TaskCallback`
- **[interval]** `number`
- **[options]** `Omit<TaskOptions,"maxRuns">` maxRuns
指定時間後に処理を実行します

## ジョブ 操作

> **TaskGenerator** -
> *() => Generator<*>*

### `runJob(generator: TaskGenerator,interval?: number ,options?: Omit<TaskOptions,"maxRuns">): number`
ジェネレーターを指定間隔ごとに実行します
### `runIntervalJob(generator: TaskGenerator,interval?: number ,options?: TaskOptions): number`
ジェネレーターを指定感覚ごとに実行し、
完了するとジェネレータを初期化し再実行します

## タスク・ジョブの操作
### `clearRun(ID: number): boolean`
タスク・ジョブを削除します

### `stop(groupID: string | "*"): boolean`
タスク・ジョブを削除します
### `start(groupID: string | "*"): boolean`
タスク・ジョブを削除します

## スコア 操作

> **targets** -
> *Player | Entity | string | (Player | Entity | string)[]*

### `get(targets,score)`
ターゲットのスコアを取得します
### `getStrings(target,separator)`
ターゲットのスコアを文字列として取得します
- **target** `Entity | Player | string`
- **separator** `boolean` 3桁区切りにします
### `set(targets,score)`
ターゲットのスコアを指定した数値します

### `add(targets,score)`
ターゲットのスコアを加算します
### `remove(targets,score)`
ターゲットのスコアを減算します
### `multiply(targets,score)`
ターゲットのスコアを乗算します
### `divide(targets,score,mode?)`
ターゲットのスコアを除算します
小数点の場合、切り捨て、切り上げ、四捨五入をmodeから選択可能
### `random(targets,range,each?)`
ターゲットのスコアをランダムに設定します
- **range** `{ max: number, min: number }`
- **each** `boolean` ターゲットが複数いる場合、それぞれにランダムなスコアを代入
### `reset(targets)`
ターゲットのスコアをリセットします

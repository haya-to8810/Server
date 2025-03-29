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
- **[delay]** `number`
- **[options]** `Omit<TaskOptions,"maxRuns">`

指定時間後に処理を実行します

## ジョブ 操作

> **TaskGenerator** -
> *() => Generator<*>*

### `runJob(generator,interval?,options?): number`
- **generator** `TaskGenerator`
- **[interval]** `number`
- **[options]** `Omit<TaskOptions,"maxRuns">`

ジェネレーターを指定間隔ごとに実行します

### `runIntervalJob(generator,interval?,options?): number`
- **generator** `TaskGenerator`
- **[interval]** `number`
- **[options]** `TaskOptions`

ジェネレーターを指定感覚ごとに実行し、
完了するとジェネレータを初期化し再実行します

## タスク・ジョブの操作
### `clearRun(ID: number): boolean`
- **ID** `number`

タスク・ジョブを削除します

### `stop(groupID): boolean`
- **groupID** `string | "*"`

指定されたグループID または 全体 のタスク・ジョブを一時停止します

### `start(groupID): boolean`
- **groupID** `string | "*"`

指定されたグループID または 全体 のタスク・ジョブを再開します

import { world } from "@minecraft/server";
import "./utils/server.js"; //ファイルをインポート

const clearID = Server.runTimeout(() => {
    world.sendMessage(`hello world (${Server.tick})`); //20
},20);

Server.runInterval(() => {
  world.sendMessage("Hello World (1 tick)")
},1);

Server.runJob(function* () {
  for(let i = 0; i < 10; i++) {
    world.sendMessage(`runJob! ${i})`);
       yield;
  }
},1);

Server.runIntervalJob(function* () {
    for(let i = 0; i < 10; i++) {
      world.sendMessage(`Interval runJob! ${i})`);
         yield;
    }
},1, {
    groupID: "sendMessages", //グループID
    maxRuns: 10, //最大繰り返し回数 (終わったら自動削除)
    priority: 1 //処理の優先順位
}); //Jobが終わったら再始動する

Server.clearRun(clearID); //クリア

Server.TPS; //TPS
Server.tick; //読み込まれてからのtick数

Server.stop("sendMessages"); //特定のグループIDの処理の一時停止
Server.start("sendMessages"); //特定のグループIDの処理の再開

Server.stop("*"); //すべての処理の停止
Server.start("*"); //すべての処理の再開

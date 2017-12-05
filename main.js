
var creepsManager = require('manager.creeps');
var towerManager = require('manager.tower');
var roomManager = require('manager.room');

module.exports.loop = function () {

    //TODO: Game Loop needs to be robust incase something errors - can't freeze up if one bug occours

    // TODO: Needs to be CPU efficient - call out to modules occasionally to save CPU
    //     TODO: EG: Only run spawn checking every 20 ticks.
    // var tickCount = Memory.tickCount;
    // Memory.tickCount = tickCount + 1;
    // // console.log(tickCount);
    // if(tickCount > CREEP_LIFE_TIME){
    //     Memory.tickCount = 0;
    // }

    //TODO: Write something for energy tracking and reporting. Amount mined, amount spent on creeps, etc...

    //TODO: USE FOR DEBUGGING CPU
    // console.log("CPU INFO |  Limit: " + Game.cpu.limit + " tickLimit: " + Game.cpu.tickLimit + " bucket: " + Game.cpu.bucket + " USED: <font color=\"red\">" + Game.cpu.getUsed() + "</font>");

    //Order towers to do things:
    towerManager.manage();

    //Make creeps do actions:
    creepsManager.manage();

    //Make creeps do actions:
    roomManager.manage();
}



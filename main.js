var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var creepSpawner = require('creep.spawner');
var towerManager = require('tower.manager');
var roomPlanner = require('room.planner');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');

module.exports.loop = function () {

    //TODO: Game Loop needs to be robust incase something errors - can't freeze up if one bug occours



    //TODO: Needs to be CPU efficient - call out to modules occasionally to save CPU
        //TODO: EG: Only run spawn checking every 20 ticks.
    var tickCount = Memory.tickCount;
    Memory.tickCount = tickCount + 1;
    // console.log(tickCount);
    if(tickCount > 1000){//TODO: Number to be lower?
        Memory.tickCount = 0;
    }



    //TODO: Run less often? - Clears Memory
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }


    //MAKE ALL TOWERS IN ALL ROOMS RUN
    for(var roomName in Game.rooms) {

        //TODO: Tempory
        roomPlanner.plan(roomName);

        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        if(towers.length > 0) {
            towerManager.run(towers, roomName);
        }
    }


    //TODO: Make use of recycleCreep(target) so they kill themselves over containers.
    //TODO: ALso look into renewCreep(target)

    //Counts of creep type
    var harvestCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    var repairerCount = 0;
    var claimerCount= 0;
    var scoutCount = 0;



    //Loop for jobs
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            harvestCount++;
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            upgraderCount++;
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            builderCount++;
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
            repairerCount++;
        }
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
            claimerCount++;
        }
        else if (creep.memory.role == 'scout'){
            roleScout.run(creep);
            scoutCount++;
        }
        else {
            console.log("Creep has no correct job assigned: " + creep.name);
        }
    }


    //Number of creep types to manage spawning
    var logString = "Harvesters: " + harvestCount +
        " Upgraders: " + upgraderCount +
        " Repairer: " + repairerCount +
        " Builders: " + builderCount +
        " Claimers: " + claimerCount +
        " Scouts " + scoutCount;

    if (Memory.logString == undefined || Memory.logString.toString().localeCompare(logString.toString())) {
        Memory.logString = logString.toString();
        console.log(logString);
    }
    creepSpawner.run(harvestCount,upgraderCount,repairerCount,builderCount,claimerCount,scoutCount);




    // //Error handeling - needs its only initalisation class
    // if(Memory.wallStrength == undefined){
    //     Memory.wallStrength = 5000;
    // }

    // if(Memory.tickCount == undefined){
    //     Memory.tickCount = 0;
    // }

}



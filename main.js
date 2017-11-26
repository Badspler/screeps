var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var creepSpawner = require('creep.spawner');
var towerManager = require('tower.manager');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');

module.exports.loop = function () {

    //Clear Memory
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }


    //MAKE ALL TOWERS IN ALL ROOMS RUN
    for(var roomName in Game.rooms) {
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towerManager.run(towers,roomName);
    }




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



}



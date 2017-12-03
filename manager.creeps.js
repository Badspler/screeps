var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');
var creepSpawner = require('creep.spawner');

module.exports = {

    manage: function() {


        //TODO: Run less often? - Clears Memory
        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }



        //TODO: Make use of recycleCreep(target) so they kill themselves over containers.
        //TODO: ALso look into renewCreep(target)

        //Counts of creep type
        var harvestCount = 0;
        var minerCount = 0;
        var haulerCount = 0;
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
            else if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
                minerCount++;
            }
            else if (creep.memory.role == 'hauler') {
                roleHauler.run(creep);
                haulerCount++;
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
            " Scouts: " + scoutCount +
            " Miners: " + minerCount +
            " Haulers: " + haulerCount;

        if (Memory.logString == undefined || Memory.logString.toString().localeCompare(logString.toString())) {
            Memory.logString = logString.toString();
            console.log(logString);
        }

        //(harvestCount, upgraderCount, repairerCount, builderCount, claimerCount,scoutCount,minerCount)
        creepSpawner.run(harvestCount,upgraderCount,repairerCount,builderCount,claimerCount,scoutCount,minerCount,haulerCount);

    }
};
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var creepSpawner = require('creep.spawner');

module.exports.loop = function () {

    //Clear Memory

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    //Counts of creep type
    var harvestCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    var repairerCount = 0;


    //Loop for jobs
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            harvestCount++;
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            upgraderCount++;
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            builderCount++;
        }
        else if(creep.memory.role == 'repairer') {
            roleBuilder.run(creep);
            repairerCount++;
        }
        else{
            console.log("Creep has no correct job assigned: " + creep.name);
        }
    }


    //Number of creep types to manage spawning
    console.log("Harvesters: " + harvestCount + " Upgraders: " + upgraderCount + " Repairer: " + repairerCount + " Builders: " + builderCount );

    creepSpawner.run(harvestCount,upgraderCount,repairerCount,builderCount);


}



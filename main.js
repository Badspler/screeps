var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
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


    //Loop for jobs
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            harvestCount++;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            upgraderCount++;
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            builderCount++;
        }
    }


    //Number of creep types to manage spawning
    console.log("Harvesters: " + harvestCount + " Upgraders: " + upgraderCount + " Builders: " + builderCount );

    // creepSpawner.run(harvestCount,upgraderCount,builderCount);





}



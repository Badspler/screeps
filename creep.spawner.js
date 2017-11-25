/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.spawner');
 * mod.thing == 'a thing'; // true
 */
var creepSpawner = {
    run: function (harvestCount, upgraderCount, repairerCount, builderCount) {

        var totalAliveCreeps = harvestCount + upgraderCount + repairerCount + builderCount;

        //TODO Build function to dynamicly build better creeps using max energy available.
        // MOVE	    50
        // WORK	    100
        // CARRY	50
        // ATTACK	80
// RANGED_ATTACK	150
        // HEAL	    250
        // TOUGH	10
        // CLAIM	600


        var minimumHarvesters = 4;
        var minimumUpgraders = 6;
        var minimumRepairer = 2;
        var minimumBuilders = 2;

        if (harvestCount < minimumHarvesters) { //TODO: CHANGE AWAY FROM BUILDERS + HARVESTERS
            creepSpawner.spawnCreep(undefined,'harvester',[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

        } else if (upgraderCount < minimumUpgraders) {
            creepSpawner.spawnCreep(undefined,'upgrader',[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

            //TODO: Add this back in when ready
        } else if (repairerCount < minimumRepairer) {
            creepSpawner.spawnCreep(undefined,'repairer',[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

        } else if (builderCount < minimumBuilders) {
            creepSpawner.spawnCreep(undefined,'builder',[WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);


        //Something has gone wrong - backup just spawn using max 300 energy.
        } else if (totalAliveCreeps < 5){
            console.log("ERROR: Creep Count Low spawning backup harbester.")
            creepSpawner.spawnCreep(undefined,'harvester',[WORK, WORK, CARRY, MOVE]);
        }

    },

    spawnCreep: function (name, type, bodyparts) {
        if (name == undefined) {
            name = type + Game.time;
        }

        //Attempt to spawn the new creep
        var name = Game.spawns.Spawn1.createCreep(bodyparts, name, {role: type})

        //print out name of new creep
        if (!(name < 0)) {
            console.log("Spawned new creep: " + name);

        }
    }
}

module.exports = creepSpawner;
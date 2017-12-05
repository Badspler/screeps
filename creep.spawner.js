/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.spawner');
 * mod.thing == 'a thing'; // true
 */
var creepSpawner = {
    run: function (harvestCount, upgraderCount, repairerCount, builderCount, claimerCount,scoutCount,minerCount,haulerCount) {

        var totalAliveCreeps = harvestCount + upgraderCount + repairerCount + builderCount;// + claimerCount +  scoutCount; //THESE TYPE NOTE COUNTED

        //TODO Build function to dynamicly build better creeps using max energy available.
        // MOVE	    50
        // WORK	    100
        // CARRY	50
        // ATTACK	80
        // RANGED_ATTACK	150
        // HEAL	    250
        // TOUGH	10
        // CLAIM	600

        //TODO: Current max is 30*50 + 300 = 1800

        var miniumTotalCreeps = 6;

        var minimumHarvesters = 4;
        var minimumHaulers = 0;//TODO
        var minimumMiners= 0;//TODO
        var minimumUpgraders = 6;
        var minimumRepairer = 2;
        var minimumBuilders = 1;
        var minimumClaimer = 0;
        var minimumCount = 5;


        if (harvestCount < minimumHarvesters) { //TODO: CHANGE AWAY FROM BUILDERS + HARVESTERS
            creepSpawner.spawnCreep(undefined,'harvester',[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

        } else if (minerCount < minimumMiners) {
            //TODO: Worker = 2 units. CARRY % WORK = 0. Needs nice divisable otherwise wasted ticks.
            creepSpawner.spawnCreep(undefined,'miner',[WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, CARRY, MOVE, CARRY]);
        } else if (haulerCount < minimumHaulers) {
            // creepSpawner.spawnCreep(undefined,'hauler',[CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]);
            creepSpawner.spawnCreep(undefined,'hauler',[CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE]);
        } else if (upgraderCount < minimumUpgraders) {
            creepSpawner.spawnCreep(undefined,'upgrader',[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

            //TODO: Add this back in when ready
        } else if (repairerCount < minimumRepairer) {
            creepSpawner.spawnCreep(undefined,'repairer',[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]);

        } else if (builderCount < minimumBuilders) {
            creepSpawner.spawnCreep(undefined,'builder',[WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]);

        } else if (claimerCount < minimumClaimer) {
            // creepSpawner.spawnCreep(undefined,'claimer',[MOVE,MOVE]);
            creepSpawner.spawnCreep(undefined,'claimer',[MOVE,MOVE,CLAIM,CLAIM]);//TODO actual
            //TODO:NB: Claimer body part reduces lifespan by 500 ticks.


            //Something has gone wrong - backup just spawn using max 300 energy.
        } else if (totalAliveCreeps < miniumTotalCreeps){
            console.log("ERROR: Creep Count Low spawning backup harbester.")
            creepSpawner.spawnCreep(undefined,'harvester',[WORK, WORK, CARRY, MOVE]);
        } else {
            //excess energy to spend - on scouts
            // creepSpawner.spawnCreep(undefined,'scout',[MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK]);
            // creepSpawner.spawnCreep(undefined,'scout',[ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,
            //     MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE,ATTACK,ATTACK,MOVE]);

            // creepSpawner.spawnCreep(undefined,'scout',[MOVE]);//TODO: Energy runner - one shot tower energy waste
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
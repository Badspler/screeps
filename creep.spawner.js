/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.spawner');
 * mod.thing == 'a thing'; // true
 */
var creepSpawner = {

    run: function (harvestCount, upgraderCount, builderCount) {

        if (harvestCount < 4) {
            //spawn harvester
            creepSpawner.spawnCreep(undefined,'harvester',[WORK,CARRY,MOVE,MOVE]);
        } else if (upgraderCount < 4) {
            creepSpawner.spawnCreep(undefined,'upgrader',[WORK,WORK,CARRY,MOVE]);
        } else if (builderCount < 2) {
            creepSpawner.spawnCreep(undefined,'builder',[WORK,WORK,CARRY,MOVE]);
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
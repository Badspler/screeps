var roleBuilder = require('role.builder');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //DEBUG INFO:
        // console.log("travel: " + creep.memory.target + " | Energy: " + creep.carry.energy + " |");

        //ERROR protection
        if(creep.memory.action == undefined) {
            creep.memory.action = 'mineing';
            creep.memory.jobOverride = 'false';
        }

        //If overrideing use all energy before switching back
        if(creep.memory.jobOverride == 'builder'){
            if(creep.carry.energy == 0){
                creep.memory.jobOverride = 'false';
                creep.memory.action = 'mineing';
            }
            roleBuilder.run(creep);
            return;
        }

        //Our action should no longer be transfering
        if(creep.carry.energy < 50){
            creep.memory.action = 'mineing';
        }

        //Go USE energy till empty
        if(creep.memory.action == 'transfering'){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                        && structure.energy < structure.energyCapacity;
                }
            });

            //Store energy in nearest container
            var containerTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });

            if(targets.length > 0 || containerTargets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                else if(creep.transfer(containerTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containerTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                else
                {
                    //TODO: Nothing to dump collection at - act as a builder till there is work to do
                    // if(targets.store(creep.memory.energy)) {
                    //     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    // }

                    // creep.memory.jobOverride = 'builder';
                    // creep.memory.building = true;//go build straight away
                    // roleBuilder.run(creep);
                }
            }
        }



        //No Energy left so will go get some
        if(creep.carry.energy < creep.carryCapacity && creep.memory.action == 'mineing') {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else{
            creep.memory.action = 'transfering';
        }


    }
};
var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {

        //ERROR protection
        if(creep.memory.repairing == undefined) {
            creep.memory.repairing = false;
        }

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }


        if(creep.memory.repairing) {


            //TODO: Investigate this:
            // //Check current repair and get it back to full - or just use the rest of our energy
            // var currentRepair = creep.memory.currentRepair;
            // if(currentRepair != undefined){
            //     if(!(creep.energy == 0 || currentRepair.hits == currentRepair.hitsMax)){
            //         if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
            //             // move towards it
            //             creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
            //         }
            //     }
            //     else{
            //         //forget it
            //         creep.memory.currentRepair = undefined;
            //     }
            // }




            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // TODO: Our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
            filter: (s) => s.hits < s.hitsMax  && s.structureType != STRUCTURE_WALL});
            // if we find one

            if (structure != undefined) {
                // try to repair it, if it is out of range

                // creep.memory.currentRepair = structure;//TODO investigate this with the above
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                creep.memory.building = true;//Don't go back and get energy
                roleBuilder.run(creep);
            }

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
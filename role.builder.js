var roleUpgrader = require('role.upgrader');


module.exports = {

/** @param {Creep} creep **/
    run: function(creep) {

    	//Tempory
        // if(Game.spawns[0].energy != Game.spawns[0].energyCapacity){
			// creep.memory.type = 'harvester';
        // }

		//ERROR protection
        if(creep.memory.building == undefined) {
            creep.memory.building = false;
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }


	    if(creep.memory.building) {

            //TODO: Check that the constuction-site is mine - otherwise my dudes will build it....

	    	var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	    	if(constructionSite != undefined){
	    		if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
	    			creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffaa00'}});
	    			return;
				}
			}
			else
            {
                //Builders will manage wall strength
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax
                        && s.hits < Memory.wallStrength
                        && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                });

                var strongerStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax
                        && s.hits < Memory.wallStrength + 5000
                        && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                });

                // if we find one
                if (structure != undefined) {
                    // try to repair it, if it is out of range
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else if(strongerStructure != undefined)
                {
                    //Hack way of increasing wall strength once all walls = wallStrength
                    Memory.wallStrength = Memory.wallStrength + 5000;
                }else {

                    //ELSE Just take the upgrade role
                    if (creep.memory.role != 'harvester') {
                        roleUpgrader.run(creep);
                    } else {
                        //TODO this is disabled via harvester currently:
                        //Reset back to harvesting
                        console.log("harvester failing to build");
                        creep.memory.jobOverride = 'false';
                        creep.memory.action = 'mineing';
                        creep.memory.building = false;
                    }
                }
			}

	    }

	    //Here: creep.memory.building = false
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};


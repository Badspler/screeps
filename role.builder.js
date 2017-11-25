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

	    	var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	    	if(constructionSite != undefined){
	    		if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
	    			creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
			else {
	    	    if(creep.memory.role != 'harvester'){
                    roleUpgrader.run(creep);
                }else{
	    	        //TODO: Harvester has nothing to harbest or build
                    //Repair?
                }
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


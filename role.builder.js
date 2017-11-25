var roleUpgrader = require('role.upgrader');


module.exports = {
//var roleBuilder = {

/** @param {Creep} creep **/
    run: function(creep) {

    	//Tempory
        // if(Game.spawns[0].energy != Game.spawns[0].energyCapacity){
			// creep.memory.type = 'harvester';
        // }

		//ERROR if switched
        if(creep.memory.building == undefined) {
            creep.memory.building = false;
            creep.say('Harvest');
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('Build');
	    }


	    if(creep.memory.building) {

	    	var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	    	if(constructionSite != undefined){
	    		if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
	    			moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
			else {
	    		roleUpgrader.run(creep);
			}

	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};


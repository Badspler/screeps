var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //DEBUG INFO:
        // console.log("travel: " + creep.memory.travel + " | Energy: " + creep.carry.energy + " |");

        //Start as collecting
        if (creep.memory.travel == undefined) {//maybe undefined?
            creep.memory.travel = 'collect';
            creep.say('Harvest');
        }

        //While collecting go collect a full load to deliver
        if (creep.memory.travel == 'collect') {
            if (creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff8888'}});
                }
            }else{
                creep.memory.travel = 'deliver';
                creep.say('Upgrade');
            }


        //Deliver energy to controller
        }else if(creep.memory.travel = 'deliver') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#ff8888'}});
            }

            //Go back to collecting once have delivered all energy
            if (creep.carry.energy == 0){
                creep.memory.travel = 'collect';
                creep.say('Harvest');
            }
        }
	}
};

module.exports = roleUpgrader;

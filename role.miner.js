module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {


        //DEBUG INFO:
        // console.log("travel: " + creep.memory.target + " | Energy: " + creep.carry.energy + " |");

        var sources = creep.room.find(FIND_SOURCES);//TODO: Be set (Currently array - needs to be source[0])
        var source = sources[1];//TODO: Be set (Currently array - needs to be source[0])

        if(source === undefined){
            //TODO set this if not set
            console.log("Error " + creep.name + " miner does not have a energy souce set");//Just print to raise issue now
            return;//do nothing
        }

        //Go to 'position' and then mine
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }


        }else {
            //We are full on energy so drop in container

            //Get our container/endpoint
            var containerId = creep.memory.containerId;//Not allowed to save directly to memory so use ID's
            var container= Game.getObjectById(containerId);

            if(containerId === undefined){
                container = findDropContainer(creep);
                //TODO: Handel container == undefined
                creep.memory.containerId = container.id;
            }

            if(!(container === null)){
                //Move to the container and transfer everything in
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }

                //TODO: Check if container is full and maybe drop on ground for extra storage.

            }else{
                //TODO No actual containers in room
                //TODO Build one?
                console.log("Error " + creep.name + " miner does not have a container to find.");//Just print to raise issue now
            }
        }


        /**
         * Searches for the closest container to the creep and returns the RoomObject of the container
         * @param creep
         * @returns {RoomObject}
         */
        function findDropContainer(creep) {
            var containerTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER );
                }
            });
            return creep.pos.findClosestByPath(containerTargets);//Can be null
        }
    }
};
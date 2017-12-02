module.exports = {


    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.spawning){
            return;//The creep isn't ready yet
        }
        //Go to 'position' and then mine


        if(creep.carry.energy == 0) {//TODO: Review if this is best option for this IF - always going to most full target - so probably ok
            movePickup(creep);
        }else {
            moveDropoff(creep);
        }

        function movePickup(creep) {
            //Find target from memory - else set it
            let targetId = creep.memory.targetId;
            if(targetId === undefined){
                let target = findPickupContainer(creep);
                if(target == null){return;}//IF NULL ERR

                targetId = target.id;
                creep.memory.targetId = targetId;
            }
            //Move towards container
            let target = Game.getObjectById(targetId);
            let success = creep.withdraw(target, RESOURCE_ENERGY);
            if( success === ERR_NOT_IN_RANGE){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff900d'}});
            } else if(success === OK){
                creep.memory.targetId = undefined;
            }
        }


        function moveDropoff(creep) {
            //Find target from memory - else set it
            let targetId = creep.memory.targetId;

            if(targetId === undefined){
                //TODO can be null
                let target = findDropContainer(creep);
                targetId = target.id;
                creep.memory.targetId = targetId;
            }
            //Move towards container
            let target = Game.getObjectById(targetId);
            let success = creep.transfer(target, RESOURCE_ENERGY);
            if( success === ERR_NOT_IN_RANGE){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff900d'}});
            } else if(success === OK){
                creep.memory.targetId = undefined;
            }
        }

        /**
         * Searches for the closest container with energy to the creep and returns the RoomObject of the container
         * @param creep
         * @returns {RoomObject}
         */
        function findPickupContainer(creep) {
            var containerTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });

            if(containerTargets === undefined){
                //TODO: no targets
                console.log("ERR: Haler found no containers");
                return null;
            }

            let biggestEnergy = -1;
            let bestTarget = containerTargets[0];
            for(i=0;i<containerTargets.length;i++){
                if(containerTargets[i].capacity > biggestEnergy){
                    biggestEnergy = containerTargets[i].capacity;
                    bestTarget = containerTargets[i];
                }
            }

            // return creep.pos.findClosestByPath(containerTargets);//Can be null
            return bestTarget;
        }

        /**
         * Searches for the closest 'storage' to the creep and returns the RoomObject of the storage
         * @param creep
         * @returns {RoomObject}
         */
        function findDropContainer(creep) {
            var containerTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            return creep.pos.findClosestByPath(containerTargets);//Can be null
        }
    }
};
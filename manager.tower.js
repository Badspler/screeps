module.exports = {
    manage: function() {
        //MAKE ALL TOWERS IN ALL ROOMS RUN
        for (let roomName in Game.rooms) {
            let towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            if (towers.length > 0) {
                run(towers, roomName);
            }
        }


        /**
         * Do all actions that towers should do each tick.
         * @param towers
         * @param roomName
         */
        function run(towers, roomName) {
            defendRoom(towers,roomName);
            //repairRoom
            //healRoom
            //etc...


            /**
             * Shoot Enemies that come into room.
             * @param tower
             * @param roomName
             */
            function defendRoom(tower,roomName) {
                var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);


                let bestTarget;
                let targetHealer = -1;
                for(i=0;i<hostiles.length;i++){
                    let heals = hostiles[i].getActiveBodyparts(HEAL);
                    if(targetHealer < heals ){
                        bestTarget = hostiles[i];
                        targetHealer = heals;
                    }
                }


                if(hostiles.length > 0) {

                    //TODO IGNORE BUCKKITS
                    var username = hostiles[0].owner.username;

                    if(username.valueOf("Buckets1667")){
                        //Code to not hit my player friend - not enabled because not needed currently
                        //return;
                    }
                    console.log("TOWER ATTACKING THREAT in " + tower.room + " FROM USER: " + username);
                    if (!username.valueOf("Invader")){
                        Game.notify(`User ${username} spotted in room ${roomName}`); //Send email alert if its not NPC
                    }

                    if(bestTarget === undefined){
                        tower.forEach(tower => tower.attack(hostiles[0]));
                    }else {
                        tower.forEach(tower => tower.attack(bestTarget));
                    }

                    return true;
                }else{
                    return false;
                }
            }
        }

    }
};
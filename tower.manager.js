/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower.manager');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(tower,roomName) {

        defendRoom(tower,roomName);


        /**
         * Shoot Enemies that come into room.
         * @param tower
         * @param roomName
         */
        function defendRoom(tower,roomName) {
            var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0) {

                //TODO IGNORE BUCKKITS
                // var username = hostiles[0].owner.username;

                if(username.valueOf("Buckets1667")){
                    //Code to not hit my player friend - not enabled because not needed currently
                    //return;
                }
                console.log("TOWER ATTACKING THREAT in " + tower.room + " FROM USER: " + username);
                if (!username.valueOf("Invader")){
                    Game.notify(`User ${username} spotted in room ${roomName}`); //Send email alert if its not NPC
                }
                tower.forEach(tower => tower.attack(hostiles[0]));
                return true;
            }else{
                return false;
            }
        }
    }
};
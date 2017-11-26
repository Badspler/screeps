/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {


    run: function(creep) {
        //E41N16
        //This is the neighbouring room i want to control
        var anotherRoomName = 'E41N17';

        if (creep.pos.x == 0) {
            creep.move(RIGHT);
        } else if (creep.pos.x == 49) {
            creep.move(LEFT);
        } else if (creep.pos.y == 0) {
            creep.move(BOTTOM);
        } else if (creep.pos.y == 49) {
            creep.move(TOP);
        }

        if(creep.room != anotherRoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit,{visualizePathStyle: {stroke: '#24ff15'}});
            return;
        }

        if(creep.room.controller) {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#24ff15'}});
            }
        }
        //TODO: When this room actually needs to be captured run this
        // if(creep.room.controller) {
        //     if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(creep.room.controller);
        //     }
        // }

    }
};
module.exports = {
    run: function(creep) {
        var baseRoom = "[room E41N16]";
        var currentRoomString = creep.room.toString();

        // creep.say("Scouting",false);

        if (creep.pos.x == 0) {
            creep.move(RIGHT);
        } else if (creep.pos.x == 49) {
            creep.move(LEFT);
        } else if (creep.pos.y == 0) {
            creep.move(BOTTOM);
        } else if (creep.pos.y == 49) {
            creep.move(TOP);
        }

        //GO KILL STUFF
        var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
        var hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);
        var hosttileSpawn = creep.room.find(FIND_HOSTILE_SPAWNS);
        var walls = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter: {structureType: STRUCTURE_WALL}});


        //Patch to deal with walls

        //TODO: Manually used for walls currently - all of this needs a proper priority loop / needs pathing to find 'good' dynamic targets
        //TODO: Needs group logic so that each attacker can pick a different target to prevent swaming to one thing (numbers 3<)

        // if(walls != undefined){
        //     if (!(currentRoomString.localeCompare(baseRoom.toString()) == 0)) {
        //         if (creep.attack(walls) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(walls, {visualizePathStyle: {stroke: '#ff1a26'}});
        //             return;
        //         }
        //     }
        // }
        // else if (hosttileSpawn.length > 0) {
        //     creep.moveTo(hosttileSpawn[0],{visualizePathStyle: {stroke: '#ff1a26'}});
        //     creep.attack(hosttileSpawn[0]);
        //     return;
        // }
        // else if (hostileCreeps.length > 0) {
        //     creep.moveTo(hostileCreeps[0], {visualizePathStyle: {stroke: '#ff1a26'}});
        //     creep.attack(hostileCreeps[0]);
        //     return;
        // }
        // else if (hostileStructures.length > 0) {
        //     creep.moveTo(hostileStructures[0] , {visualizePathStyle: {stroke: '#ff1a26'}});
        //     creep.attack(hostileStructures[0]);
        //     return;
        // }



        //////////////////////// GO SOMEWHERE//////////////////////////////////

        var roomN2 = "[room E41N17]";
        var roomN3 = "[room E41N18]";
        var roomN3stuck = "[room E42N18]";
        var enemyRoom = "[room E41N19]";

        var anotherRoomName = 'E41N17';
        if (currentRoomString.localeCompare(baseRoom.toString()) == 0) {
            //E41N16
            //This is the neighbouring room i want to control
            anotherRoomName = 'E41N17';
            if (creep.room != anotherRoomName) {
                const exitDir = 1;
                const exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#ff1a26'}});
            }

        }
        // //TODO: Completly redo this to actually do something useful
        // else if (currentRoomString.localeCompare(roomN2.toString()) == 0) {
        //     //E41N17
        //     anotherRoomName = 'E41N18';
        //     if (creep.room != anotherRoomName) {
        //         const exitDir = Game.map.findExit(creep.room, anotherRoomName);
        //         const exit = creep.pos.findClosestByPath(exitDir);
        //         creep.moveTo(42, 0, {visualizePathStyle: {stroke: '#ff1a26'}});
        //     }
        // } else if (currentRoomString.localeCompare(roomN3stuck.toString()) == 0) {
        //     //E41N17
        //     anotherRoomName = 'E41N18';
        //     if (creep.room != anotherRoomName) {
        //         const exitDir = Game.map.findExit(creep.room, anotherRoomName);
        //         const exit = creep.pos.findClosestByPath(exitDir);
        //         creep.moveTo(37,21, {visualizePathStyle: {stroke: '#ff1a26'}});
        //     }
        // }



        // else if (currentRoomString.localeCompare(roomN3.toString()) == 0) {
        //     //E41N18
        //     anotherRoomName = 'E41N19';
        //     if (creep.room != anotherRoomName) {
        //         const exitDir = Game.map.findExit(creep.room, anotherRoomName);
        //         const exit = creep.pos.findClosestByRange(exitDir);
        //         // creep.moveTo(27,7, {visualizePathStyle: {stroke: '#ff1a26'}});
        //         creep.moveTo(27,0, {visualizePathStyle: {stroke: '#ff1a26'}});
        //     }
        // }
    }
};
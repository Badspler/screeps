/**
 *
 *
 * The plan for this class is to pass a room in to be populated with roads.
 * This is NOT to be for a spawn room / base. TODO: Later
 *
 * This is responsible for room setup - not room management
 *
 * Input: Room  +  Entry point
 *
 * @type {{plan: module.exports.plan}}
 */
module.exports = {
    plan: function(roomNames) {//TODO Need entry point that I am coming from - Later could be multiple points [array]

        // var connectionPoint;//TODO array later that would hold many points for junction rooms
        var entryPoint;//To be entry/exit point of the room


        //TODO: Make a dry run option that will plot with room.visual

        //TODO: Find the rooms controller
            //None = err - can't boost energy
        //TODO: Find energy sources
            //None = err - cant use room
            //TODO: Find spots that can be harvested from.

        //TODO: Plot path from entryPoint to the controller
            //TODO: It is probably NOT be worth it to build (and maintain) a road here.

        //TODO: Plot a path from entryPoint to the energySources and from the energy sources to each other
            //TODO: Save for a road
            //TODO: Build construction sites for roads
            //TODO: Maybe find/use path between energySources

        //TODO: Find path between available spots to entry point and maybe also other source(s).
        //TODO: Place construction sites for containers at energySources

        //TODO: congrats now room is mapped + constructions setup

        //Next Steps/extras:
        //TODO: Solve for estimated creep move time from entry to controller
            //TODO: On this point could do the same to energy spawns for hauler suicides - probably wise
        //Save most of this info to memory for later use



        console.log("-----------------");

        // defendRoom(tower,roomName);
        for(var roomName in Game.rooms) {//Loop through all rooms your creeps/structures are in
            var room = Game.rooms[roomName];
            console.log(roomName);
            // console.log(room.energyAvailable);//No usful ideas yet
            // console.log(room.energyCapacityAvailable);//no usful ideas yet

            // var loc = Game.rooms[roomName].find(STRUCTURE_POWER_SPAWN);
            // var loc = room.find(STRUCTURE_POWER_SPAWN);

            var sources = room.find(FIND_SOURCES);
            for (i = 0; i < sources.length; ++i) {
                console.log(sources[i].pos);
            }

            // sources.forEach(function(entry) {
            //     console.log(entry.pos);
            // });

            // console.log(sources[0].pos);
            // console.log(sources[1].pos);


            // for(var source in room.find(FIND_SOURCES)){
            //     console.log(source.pos);
            // }

            // console.log(room.terminal);
            // console.log(room.safeMode);
            // console.log(room.safeModeAvailable);
            // console.log(room.safeModeCooldown);
            // console.log(room.terminal);
        }



        //lookAt(x, y) //(target)








        //TODO: Use room.visual for drawing plans on my room - like where I will build (looks like creep pathing)
        // http://docs.screeps.com/api/#RoomVisual
        // console.log(room.visual);




        // function defendRoom(tower,roomName) {

        // }
    }
};
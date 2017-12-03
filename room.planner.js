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



        // console.log("-----------------");

        // defendRoom(tower,roomName);
        for(var roomName in Game.rooms) {//Loop through all rooms your creeps/structures are in
            var room = Game.rooms[roomName];
            // console.log(roomName);

            //TODO: Accept an entry point - build a flag there (append room name for uniqueness): entryFlag

            // console.log(room.energyAvailable);//No usful ideas yet
            // console.log(room.energyCapacityAvailable);//no usful ideas yet

            // var loc = Game.rooms[roomName].find(STRUCTURE_POWER_SPAWN);
            // var loc = room.find(STRUCTURE_POWER_SPAWN);


            // goal: function(poss,rangee) {
            //     var goal;
            //     goal.pos = poss;
            //     goal.range = rangee;
            //     return goal;
            // }







            // // TODO: Turn into function: WORKS - TURNED INTO BELOW
            // var sources = room.find(FIND_SOURCES);
            // for (i = 0; i < sources.length; ++i) {
            //     let origin = Game.flags.Flag1.pos;
            //     // console.log(origin.x + " " + origin.y);
            //     // console.log(Game.flags.Flag1.room  + " " + sources[i].room);
            //     if (Game.flags.Flag1.room == sources[i].room) {
            //         var goal = {pos:sources[i].pos , range:1};//Create goal object for path search
            //         var pathSet = PathFinder.search(origin, goal);
            //
            //         // var keys = Object.keys(path);//TODO What the hell is in path?
            //         // console.log(keys.toString());
            //         // Actually the doco says:
            //
            //         // const constuctionTotal = pathSet.path.length;//TODO : Number of constuction sites to manage
            //         const pathComplete = pathSet.incomplete;//TODO: True/false if incomplete
            //
            //         for(j = 0; j < pathSet.path.length; j++){
            //             roomPos = new RoomPosition(pathSet.path[j].x ,pathSet.path[j].y, roomName);
            //             roomPos.createConstructionSite(STRUCTURE_ROAD);
            //         }
            //     }
            // }
            // // TODO: Turn into function

            //TODO: Important note that flags have undefiend room unless there is a creep in them to give 'visability'

            // TODO: THIS WORKS
            // let origin = Game.flags.Flag1.pos;
            // let goal = Game.flags.Flag2.pos;
            // buildRoads(roomName,origin,goal);//TODO BUILD FROM ORIGIN TO

            function buildRoads(roomName,origin,goal) {
                //Example goal:
                // var goal = {pos:sources[i].pos , range:1};//Create goal object for path search

                //TODO: Make check for roomVisability - not sure how yet

                if (origin.room === goal.room) {
                    var pathObject = PathFinder.search(origin, goal);
                    // const constuctionTotal = pathSet.path.length;//TODO : Number of constuction sites to manage
                    if(pathObject.incomplete){
                        return 2;//ERROR Couldn't make path
                    }

                    //Specificly add road to origin spot - not on the path //TODO Make better?
                    roomPos = new RoomPosition(origin.x ,origin.y, roomName);
                    success = roomPos.createConstructionSite(STRUCTURE_ROAD);//TODO use success to determine error occurred

                    for(i = 0; i < pathObject.path.length; i++){
                        roomPos = new RoomPosition(pathObject.path[i].x ,pathObject.path[i].y, roomName);
                        success = roomPos.createConstructionSite(STRUCTURE_ROAD);//TODO use success to determine error occurred
                    }

                    return 0;//Success!
                }else {
                    return 1;//ERROR Origin and Goal not in same room
                }
            }









            //TODO: There are 4 flags:
            //TODO: entryFlag
            //TODO: energySouceOneFlag
            //TODO: energySouceTwoFlag
            //TODO: controllerFlag



            //TODO: Only entryFlag is known
            //TODO: Find energySpawn's
            //TODO: Path from entryFlag to spawn(s)
                //Thus create flags at spawn


            //TODO: Use this http://docs.screeps.com/api/#PathFinder
            //PathFinder.search(origin, goal, [opts])

            //TODO: Later optimize using 'CostMatrix':
                //TODO: http://docs.screeps.com/api/#PathFinder-CostMatrix


            //entryFlag to energySource1Flag


            // var flags = Game.flags;//Flags is a hash set
            // Object.keys(flags).forEach(function (key) {
            //     var flag = flags[key];
            //     if(room == flag.room) {//Otherwise flags show for every room
            //         console.log("FLAGS: x:" + flag.pos.x + " y:"+flag.pos.y );
            //         roomPos = new RoomPosition(flag.pos.x ,flag.pos.y, roomName);
            //         var success = roomPos.createConstructionSite(STRUCTURE_ROAD);
            //         console.log(success);
            //
            //     }
            // })

            //TODO: Make flags
            // createFlag(x, y, [name], [color], [secondaryColor])
            // (pos, [name], [color], [secondaryColor])
            // COLOR_* constants




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
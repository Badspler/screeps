roomPlanner = require('room.planner');

module.exports = {


    //TODO: Manage a room
    //

    //TODO: Write a defcon system to manage when safe-modes should be used

manage: function() {

    //TODO:...

    //TODO: Manage spawns and 'rooms' then from rooms their souces + elements
    //TODO: Make a set in Game.Memory
    //TODO: When the spawn.manager is called - build creeps from this list - manage if creep is still alive
    //TODO: Build a 'spawn' setter creep - cheap

    // console.log(Game.spawns['Spawn1'].room);

    // console.log(Game.spawns["Spawn1"]);

    // var base = createBase(Game.spawns["Spawn1"]);

    base = Memory.base;


    //TODO:For each source
    //TODO: if no creep
    //TODO:    queue a miner / hauler
    //TODO:
    //TODO:
    // for(base['sources'])

        // /base['sources'] = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    // base['resources'] = Game.spawns['Spawn1'].room.find(FIND_MINERALS);

    // printBase(Memory.base);


    // console.log(base.toString());
    // updateBase(base);//TODO: Dont do this every time





        /**
         * Creates a new base object by taking in a new spawn.
         * @param spawn
         * @returns {{}}
         */
        function createBase(spawn) {
            var base = {};//Empty object
            base['spawn'] = spawn;
            base['sources'] = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
            base['resources'] = Game.spawns['Spawn1'].room.find(FIND_MINERALS);
            let rooms = new Array();//Empty Array
            rooms.push(spawn.room);
            base['rooms'] = rooms;
            return base;
        }



        function updateBase(base) {
            Memory.base = base;
        }

        function printBase(base) {
            console.log("---------");
            var keys = Object.keys(base);
            for(i=0; i<keys.length; i++){
                console.log(keys[i] + " : " + base[keys[i]])
            }
        }
    }
};
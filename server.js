//@ts-check
import { system } from "@minecraft/server";

/**
 * @callback TaskCallback
 * @param { { currentTick: number } } event
 */

/** @typedef {() => Generator<*>} TaskGenerator */

/**
 * @typedef {Object} TaskOptions
 * @property {string} [groupID]
 * @property {number} [maxRuns]
 * @property {number} [priority] - 優先度
 */

/**
 * @typedef {Object} Task
 * @property {"task"} type
 * @property {TaskCallback} callback
 * @property {number} interval
 * @property {number} id
 * @property {string} groupID
 * @property {number} maxRuns
 * @property {number} priority
 */

/**
 * @typedef {Object} Job
 * @property {"job"} type
 * @property {Generator<*>} callback
 * @property {TaskGenerator} generator
 * @property {number} interval
 * @property {number} id
 * @property {number} maxRuns
 * @property {string} groupID
 * @property {number} priority
*/

const ServerState = {
    /** @readonly @type {(Task | Job)[]} */ scheduledTasks: [],
    /** @type {Record<string,boolean>} */ stoppedTasks: {},
    running: true,
    date: Date.now(),
    taskIDCounter: 0,
};

/**
 * @overload
 * @param {"job"} type
 * @param {TaskGenerator} callback
 * @param {number} interval
 * @param {number} [maxRuns]
 * @param {number} [priority]
 * @param {string} [groupID]
 */
/**
 * @overload
 * @param {"task"} type
 * @param {TaskCallback} callback
 * @param {number} interval
 * @param {number} [maxRuns]
 * @param {number} [priority]
 * @param {string} [groupID]
 */
/**
 * @returns {number}
 */
const addTask = (type, callback, interval, maxRuns = Infinity, priority = 0, groupID = "") => {
    const id = ServerState.taskIDCounter++;
    const task = {
        type,
        callback: type === "job" ? callback() : callback,
        interval,
        maxRuns,
        priority,
        id,
        groupID,
        generator: type === "job" ? callback : undefined,
    };
    
    let index = ServerState.scheduledTasks.findIndex(t => t.priority < priority);
    index = index === -1 ? ServerState.scheduledTasks.length : index;
    ServerState.scheduledTasks.splice(index, 0, task);
    
    return id;
};

/** @enum {Object} */
globalThis.Server = {
    /** @readonly */ tick: 0,
    /** @readonly */ TPS: 0,

    /**
     * @param {TaskCallback} callback
     * @param {number} [interval]
     * @param {TaskOptions} [options]
     */
    runInterval: (callback, interval = 1, options = {}) => addTask("task",callback, interval, Infinity, options.priority, options.groupID),
    

    /**
     * @param {TaskCallback} callback 
     * @param {number} delay 
     * @param {Omit<TaskOptions,"maxRuns">} [options]
     */
    runTimeout: (callback,delay,options = { }) => addTask("task",callback, delay, 1, options.priority, options.groupID),

    /**
     * @param {TaskGenerator} generator
     * @param {number} [interval]
     * @param {TaskOptions} [options]
     * @returns {number}
     */
    runIntervalJob: (generator, interval = 1, options = {}) => addTask("job",generator,interval,options.maxRuns,options.priority,options.groupID),

    /**
     * @function
     * @param {TaskGenerator} generator 
     * @param {number} interval 
     * @param {Omit<TaskOptions,"maxRuns">} [options]
     */
    runJob: (generator, interval = 1, options = {}) => addTask("job",generator,interval,1,options.priority,options.groupID),

    clearRun: (ID) => {
        const index = ServerState.scheduledTasks.findIndex(task => task.id === ID);
        return index !== -1 && !!ServerState.scheduledTasks.splice(index, 1);
    },

    /** @param {string} groupID */
    stop: (groupID) => groupID ? ServerState.stoppedTasks[groupID] = true : ServerState.running = false,
    /** @param {string} groupID */
    start: (groupID) => groupID ? delete ServerState.stoppedTasks[groupID] : ServerState.running = true,
};

void function update() {
    const currentTime = Date.now();
    const timeDiffSec = (currentTime - ServerState.date) / 1000;
    
    //@ts-ignore
    Server.tick++, Server.TPS = 1 / timeDiffSec;
    ServerState.date = currentTime;
    
    if (ServerState.running) {
        const tasks = ServerState.scheduledTasks;
        const currentTick = Server.tick;
        
        for (let i = 0; i < tasks.length;) {
            const task = tasks[i];
            if (ServerState.stoppedTasks[task.groupID]) { i++; continue; }
            
            try {
                if (currentTick % task.interval === 0) {
                    if (task.type === "task") {
                        task.callback({ currentTick });
                        if (--task.maxRuns <= 0) {
                            tasks.splice(i, 1);
                            continue;
                        }
                    } else if (task.type === "job") {
 
                        task.callback.next();
                        
                        if (task.callback.return().done) {
                            if (--task.maxRuns <= 0) tasks.splice(i, 1);
                            else task.callback = task.generator();
                        }
                    }
                }
            } catch (e) {
                console.error(`Error in ${task.type} ${task.id}:`, e);
                if(task.interval === undefined) tasks.splice(i, 1);
                continue;
            }
            i++;
        }
    };

    system.runTimeout(update, 1);
}();

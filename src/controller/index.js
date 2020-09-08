const getEventsController = require("./get-events");
const getPastEventsController = require("./get-past");
const addEventsController = require("./post-event");
const editEventsController = require("./patch-event");
const getFutureEventsController = require("./get-future");
const getEventController = require("./get-event");


const controllers= Object.freeze({
    getEventController,
    getEventsController,
    getFutureEventsController,
    getFutureEventsController,
    addEventsController,
    editEventsController,
    getPastEventsController
})

module.exports = controllers

const eventDB = require("./eventDB");
let mongoose = require('mongoose')
const EventModel = require('./schema')
let Event = eventDB(EventModel)
module.exports = Event

const Event = require("../data-access");

const getEvents = require("../use-cases/getEvents");
async function getEventsController(req, res) {
    try {
        let events = await getEvents(Event)
        res.status(201).send({ events })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }

}
module.exports = getEventsController
const Event = require("../data-access");
const addEvent = require("../use-cases/addEvent");

async function addEventsController(req, res) {
    try {
        const eventBody = { ...req.body }
        let postedEvent = await addEvent(eventBody, Event)
        res.status(201).send({ postedEvent })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = addEventsController
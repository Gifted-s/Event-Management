const Event = require("../data-access");
const getFutureEvents = require("../use-cases/getFutureEvents");
async function getFutureEventsController(req, res) {
    try {
        let futureEvents = await getFutureEvents(Event)
        res.status(201).send({ futureEvents })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }

}
module.exports = getFutureEventsController
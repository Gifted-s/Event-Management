const Event = require("../data-access");
const getPastEvents = require("../use-cases/viewPastEvent");
async function getPastEventsController(req, res) {
    try {
        let pastEvents = await getPastEvents(Event)
        res.status(201).send({ pastEvents })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }

}

module.exports = getPastEventsController
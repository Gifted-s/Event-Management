const Event = require("../data-access");
const getEvent = require("../use-cases/getEvent");
async function getEventController(req, res) {
    try {
        let event = await getEvent(req.params.id, Event)
        res.status(201).send({ event })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
    console.log('hello')
}
module.exports = getEventController
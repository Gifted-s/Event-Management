const Event = require("../data-access");
const editEvent = require("../use-cases/editEvent");
async function editEventsController(req, res) {
    try {
        
        const changesBody = { ...req.body, id: req.params.id }
        let updatedEvent = await editEvent(changesBody, Event)
        res.status(201).send({ updatedEvent })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}
module.exports = editEventsController
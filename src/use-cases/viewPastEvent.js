async function getPastEvents(Event) {
    let events = await Event.getPastEvents()
    return events
}
module.exports = getPastEvents

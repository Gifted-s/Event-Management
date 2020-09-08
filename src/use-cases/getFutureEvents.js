async function getFutureEvents(Event) {
    let events = await Event.getFutureEvents()
    return events
}
module.exports = getFutureEvents

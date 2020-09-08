async function getEvents(Event){
let events = await Event.getAllEvents()
return events
}
module.exports= getEvents

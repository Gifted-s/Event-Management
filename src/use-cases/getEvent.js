async function getEvent(id, Event){
if(!id){
    throw new Error('id is required for this request')
}
let event = await Event.findEvent({id})
return event
}
module.exports = getEvent
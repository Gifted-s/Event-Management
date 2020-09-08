const checkEvent = require("../event/event")
const canPostEvent = require("../user-validator/validateUser")

async function editEvent(changesEvent, Event) {
    const { id, ...updateDetails } = changesEvent
    if (!id) {
        throw new Error('id is required for this request')
    }
    if(!updateDetails.posterId){
        throw new Error('posterId is required for this request')
    }
    let userCanPost = await canPostEvent(updateDetails.posterId)
    if(userCanPost){
        let eventExist = await Event.findEvent({ id })
        if (!eventExist) {
            throw new Error('no event with this id')
        }
        let eventToUpdate = checkEvent({ ...eventExist, ...updateDetails, dateModified: undefined })
        let updatedEvent = await Event.updateEvent(id, eventToUpdate)
        return updatedEvent
    }
    else{
        throw new Error('Sorry you don\'t have the right to edit an event' )
    }
   
}

module.exports = editEvent
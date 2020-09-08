const checkEvent = require("../event/event")
const canPostEvent = require("../user-validator/validateUser")

 async function addEvent(eventBody, Event) {
 
  const validatedEvent = checkEvent(eventBody)
   let canPost = await canPostEvent(eventBody.posterId)
   if(canPost){
    let addedEvent = await Event.insertEvent({
        ...validatedEvent
    })
    return addedEvent
   }
   else{
    throw new Error('Sorry you don\'t have the right to post an event')
   }
   
}

module.exports = addEvent
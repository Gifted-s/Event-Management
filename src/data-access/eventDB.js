 function eventDB(Event) {
    return Object.freeze({
        findEvent,
        insertEvent,
        updateEvent,
        getAllEvents,
        clearDB,
        getFutureEvents,
        getPastEvents
    })
    async function findEvent({ id }) {
        const foundEvent = await Event.findOne({ _id: id })
        if (foundEvent !== null){
            return foundEvent._doc
        }
        else return false
    }
    async function insertEvent(event) {
        let newEvent =  new Event(event)
        let result=  await newEvent.save()
    
        return {_id:result._id, ...event}

    }
    async function updateEvent(id, eventToUpdate) {
         await Event.updateOne({ _id: id }, { $set: { ...eventToUpdate } })
        return {_id:id, ...eventToUpdate}
    }
    async function getAllEvents() {
        let events = await Event.find({})
        return events
    }

    async function getFutureEvents() {
        let futureEvents = await Event.find().where('from').gt(Date.now())
        return futureEvents
    }
    async function getPastEvents() {
        let pastEvents = await Event.find().where('from').lt(Date.now())
        return pastEvents
    }
    async function clearDB(){
    await  Event.deleteMany({schemaVersion:1})
    }


}

module.exports = eventDB
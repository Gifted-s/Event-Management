const axios = require('axios')
const { clearDB } = require('../src/data-access')
const uuid = require('uuid').v1
const  mongoose = require('mongoose')
const mongoUnit = require('mongo-unit')
const { server ,app} = require('../src')
beforeAll(() => {

    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
        // Throw only if the status code is greater than or equal to 500
        return status < 500
    }   
     

})

beforeEach(()=>{
//    console.log('hello guys with a')
//     mongoUnit.start().then(() => {
//         console.log(mongoUnit.getUrl())
//         console.log('fake mongo is started: ', mongoUnit.getUrl())
//         mongoose.connect(mongoUnit.getUrl(), {useNewUrlParser:true,useUnifiedTopology:true} )
//         // this var process.env.DATABASE_URL = will keep link to fake mongo
//         // this line start mocha tests
//       })
})
afterEach(async() => {
    await clearDB()
})
afterAll(()=>{
   server.close()
})
let root = 'http://localhost:3000/emapi/v1'
describe('adding event', () => {
    it('adds an event to the database', async () => {

        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2020-02-31",
                "to": "2020-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        )
      
        expect(response.status).toBe(201)
        const { postedEvent } = response.data
        const event = await axios.get(root + '/get-event/' + postedEvent._id)
        expect(event.data.event).toEqual({...postedEvent,__v:0})
        // let newDB = commentDB.filter(comment => comment.id !== posted.id)
        // commentDB = newDB
    })
    it('requires event to contain an eventName', async () => {
        const response = await axios.post(
            root + '/add-event',
            { eventName: undefined }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a name')

    })
    it('requires event to contain a subHead', async () => {
        const response = await axios.post(
            root + '/add-event',
            { eventName: "Adewui Sunkanmi", subHead: undefined }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a subhead')

    })
    it('requires event to contain paragraphs', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": undefined,
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have paragraphs')

    })
    it('requires event paragraphs to be in array', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": "an array is needed",
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('paragraphs must be an array')

    })
    it('requires an event to have a bibleReference', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a bible reference')

    })
    it('requires an event to have a from field', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a starting date')

    })
    it('requires an event to have a to field', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":121223232323,
                "to":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have an ending date')

    })
    it('requires an event to have a venue field', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":121223232323,
                "to":12121212121212,
                "venue":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a venue')

    })
    it('requires an event to have a posterId field', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":121223232323,
                "to":12121212121212,
                "venue":"CCCSPFUTA",
                "posterId":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a posterId')

    })
    it('requires an event imageUrls field to be an array', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":121223232323,
                "to":12121212121212,
                "venue":"CCCSPFUTA",
                "posterId":"123-34-554545",
                "imageUrls":"http://something.com"
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('images type must be an array')

    })
    it('requires an event to have a venue field', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["an array is needed"],
                "bibleReference":"Mattew 32:1",
                "from":121223232323,
                "to":12121212121212,
                 "posterId":"123-shbd-sdhgsd",
                "venue":"CCCSPFUTA",
                "imageUrls":["http://fahim", "http://hello.com"],
                "theme":undefined
            }
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('event must have a theme')

    })
})


describe('editing an event', () => {
    it('edit an event in the database', async () => {
        
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2020-02-31",
                "to": "2020-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        )
      
        expect(response.status).toBe(201)
        const editedEvent = {
            eventName: 'Easter Sunday',
            posterId:'123-3434-3434-1212'

        }
        const editedResponse = await axios.post(root + '/edit-event/' + response.data.postedEvent._id, editedEvent)
        expect(editedResponse.status).toBe(201)
        expect({ ...response.data.postedEvent, ...editedEvent,dateModified:null}).toMatchObject({ ...editedResponse.data.updatedEvent, dateModified:null })
    })
    it('must contain an id to edit an event', async () => {

        const editedResponse = await axios.post(root + '/edit-event/')

        expect(editedResponse.status).toBe(404)

    })

    it('must return error if comment was not found', async () => {

        const editedResponse = await axios.post(root + '/edit-event/' + "5f51f14732a67731f8cc8055", {
            eventName:"Christmas Ceremony",
            posterId:"123-3434-3434-1212"
        })
        expect(editedResponse.status).toBe(400)
        expect(editedResponse.data.error).toBe('no event with this id')

    })
})





describe('getting an event', () => {
    it('get an event from the database', async () => {
        const response = await axios.post(
            root + '/add-event',
            {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2020-02-31",
                "to": "2020-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        )
      
        expect(response.status).toBe(201)
        const event = await axios.get(root + '/get-event/' + response.data.postedEvent._id)
        expect(event.data.event).toBeDefined()
    })
    it('must contain an id to get an event', async () => {

        const event = await axios.get(root + '/get-event/')

        expect(event.status).toBe(404)

    })

    it('must return error if an event was not found', async () => {
       
        const editedResponse = await axios.get(root + '/get-event/' + '5f51f14732a67731f8cc8055')
        expect(editedResponse.data.event).toBe(false)

    })
})

describe('getting all events', () => {
    it('get all events from the database', async () => {
        let eventBody = 
        
             {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2020-02-31",
                "to": "2020-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        
        await axios.post(root + '/add-event', eventBody)
        await axios.post(root + '/add-event', eventBody)
        await axios.post(root + '/add-event', eventBody)
        await axios.post(root + '/add-event', eventBody)
        await axios.post(root + '/add-event', eventBody)
        await axios.post(root + '/add-event', eventBody)
        let events = await axios.get(root + '/get-events/')
        expect(events.data.events.length).toBe(6)
    })

})



describe('getting past events', () => {
    it('get past events from the database', async () => {
        let eventBody = 
        
             {
                "eventName": "Event Name is key 2019",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2020-02-31",
                "to": "2020-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        
        let postedEvent=  await axios.post(root + '/add-event', eventBody)
        let events = await axios.get(root + '/get-past-events/')
        
        expect(events.data.pastEvents[0]).toMatchObject({__v:0,...postedEvent.data.postedEvent})
    })

})



describe('getting past events', () => {
    it('get future events from the database', async () => {
        let eventBody = 
        
             {
                "eventName": "Event Name is key 2030",
                "subHead": "Once per year",
                "paragraphs": ["I love you", "You are nice"],
                "bibleReference": "Mattew 23:30",
                "from": "2080-10-31",
                "to": "2090-03-21",
                "venue": "CCCSP FUTA",
                "theme": "Let my children come to me for theirs is the kingdom of God",
                "posterId": "123-3434-3434-1212",
                "imageUrls": ["http://best.cm.ng", "http://test.com.ng"]
            }
        
        let postedEvent=  await axios.post(root + '/add-event', eventBody)
        let events = await axios.get(root + '/get-future-events/')
        
        expect(events.data.futureEvents[0]).toMatchObject({__v:0,...postedEvent.data.postedEvent})
    })

})
let express = require('express')
let cors = require('cors')
const controllers = require('./controller')
const {
    getEventController,
    getEventsController,
    addEventsController,
    editEventsController,
    getFutureEventsController,
    getPastEventsController } = controllers
let app = express()
const endPoint = "/emapi/v1"
app.use(cors())
app.use(express.json())
app.get(endPoint + '/get-events', getEventsController)
app.get(endPoint + '/get-event/:id', getEventController)
app.post(endPoint + '/add-event', addEventsController)
app.post(endPoint + '/edit-event/:id', editEventsController)
app.get(endPoint + '/get-future-events', getFutureEventsController)
app.get(endPoint + '/get-past-events', getPastEventsController)
let server= app.listen(3000, () => console.log('Listening on port 3000'))

module.exports = {app, server}

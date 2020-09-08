let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true,useUnifiedTopology:true})
let Schema = mongoose.Schema
let EventSchema = new Schema({
    eventName: {
        required: true,
        type: String
    },
    subHead: {
        required: true,
        type: String
    },
    paragraphs: {
        required: true,
        type: Array
    },
    bibleReference: {
        required: true,
        type: String
    },
    from: {
        required: true,
        type: Number
    },
    to: {
        required: true,
        type: Number
    },
    venue: {
        required: true,
        type: String
    },
    theme: {
        required: true,
        type: String
    },
    posterId: {
        required: true,
        type: String
    },
    imageUrls: {
        required: true,
        type: Array
    },
    dateAdded: {
        required: true,
        type: Number
    },
    dateModified: {
        required: true,
        type: Number
    },
    schemaVersion: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model('Event', EventSchema)
function checkEvent(
    { eventName,
        subHead,
        paragraphs,
        schemaVersion = 1,
        dateAdded = Date.now(),
        dateModified = Date.now(),
        bibleReference,
        from,
        to,
        venue,
        theme,
        posterId,
        imageUrls ={}}
) {

    if (!eventName) {
        throw new Error('event must have a name')
    }
    if (!subHead) {
        throw new Error('event must have a subhead')
    }
    if (!paragraphs) {
        throw new Error('event must have paragraphs')
    }
    if (!Array.isArray(paragraphs)) {
        throw new Error('paragraphs must be an array')
    }
    if (!bibleReference) {
        throw new Error('event must have a bible reference')
    }
    if (!from) {
        throw new Error('event must have a starting date')
    }
    if (!to) {
        throw new Error('event must have an ending date')
    }
    if (!venue) {
        throw new Error('event must have a venue')
    }
    if (!posterId) {
        throw new Error('event must have a posterId')
    }
    if (!imageUrls) {
        throw new Error('event must have images')
    }
    if (!Array.isArray(imageUrls)) {
        throw new Error('images type must be an array')
    }
    if (!theme) {
        throw new Error('event must have a theme')
    }
    let validatedEvent = { eventName, subHead, paragraphs, bibleReference, from: new Date(from).getTime(), to: new Date(to).getTime(), venue, theme, posterId, imageUrls, dateAdded, dateModified, schemaVersion }
    return validatedEvent
}

module.exports = checkEvent
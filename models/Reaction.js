const {Schema} = require('mongoose');

let reactionValid = [
    validate({
        validator: 'isLength',
        arguments: [1, 280],
        message: '(between 1-280 char)'
    })
]

const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId,
        

    },
    reactionBody: {
        type: String,
        required: true,
        validate: reactionValid,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // getter function?
    },
    username: {
        type: String,
        required: true,
    },
})

thoughtSchema.get(function () {
    return this.createdAt.default
})


// Subdocument
module.exports= reactionSchema
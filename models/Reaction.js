const {Schema} = require('mongoose');



const reactionSchema = new Schema({
    // reactionId: {
    //     type: ObjectId,
    //     default: new ObjectId,
        

    // },
    reactionBody: {
        type: String,
        required: true,
        minLength: [1, 'Too few'],
        maxLength: [280, 'Too many']
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

reactionSchema.get(function () {
    return this.createdAt.default
})


// Subdocument
module.exports= reactionSchema
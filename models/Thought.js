const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

let thoughtValid = [
    validate({
        validator: 'isLength',
        arguments: [1, 280],
        message: 'Thoughts should be thoughtful (between 1-280 char)'
    })
]

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true,
            required: true,
            validate: thoughtValid

        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => dataFormat(timestamp)
            // getter function?
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.get(function () {
    return this.createdAt.default
})

thoughtSchema.virtual('reaction').get(function () {
    return this.reactions
})


const Thought = model('thought', thoughtSchema)
module.exports = Thought
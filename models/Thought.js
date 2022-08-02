const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true,
            required: true,
            minLength: [1, 'Too few'],
            maxLength: [280, 'Too many']

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
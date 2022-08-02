const { Schema, model } = require('mongoose');

let validateEmail = (email) =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email)
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {

            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please use an email address that follows this: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },
    {
        toJSON: {
            virtuals:true,

        },
        id: false,
    });

const User = model('user', userSchema);


module.exports = User;
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String, 
        required: true, 
        minLength: [4, 'name must be longer than 4 chas'], 
        maxLength: [31, 'name must be smaller than 31 chars'], 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String, 
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
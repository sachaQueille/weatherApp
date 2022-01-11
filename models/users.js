let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    mail: String,
    pwd: String,
})

let UserModel = mongoose.model('users', userSchema)

module.exports = {userSchema, UserModel}
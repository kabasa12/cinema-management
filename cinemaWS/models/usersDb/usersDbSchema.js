const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

let UsersDbSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('users', UsersDbSchema)
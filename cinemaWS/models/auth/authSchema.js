const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

let AuthSchema = new Schema({

    token: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('tokens', AuthSchema)
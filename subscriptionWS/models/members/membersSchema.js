const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

const requiredEmailValidator = [
	function (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
	},
	'Please supply a valid email address'	
]

let MemberSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: requiredEmailValidator,
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('members', MemberSchema)
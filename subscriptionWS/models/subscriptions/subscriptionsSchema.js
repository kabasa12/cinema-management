const mongoose = require('mongoose');
const common = require('../../utils/common');
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

const subMovieSchema = new Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true,
        unique: true
    },
    watchDate: {
        type: String,
        required: true,
        validate: common.requiredDateValidator,
    },
  });

let SubScriptionSchema = new Schema({

    memberId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true,
        unique: true
	},
    movies: [subMovieSchema]
});

module.exports = mongoose.model('subscriptions', SubScriptionSchema)
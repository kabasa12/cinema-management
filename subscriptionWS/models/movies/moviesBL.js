const Movie = require('./moviesSchema');

exports.getAllMovies = async (req, resp) => {
    try {
        let data = await allMovies()
        return resp.status(200).json({ 
            isSuccess: true,
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching all movies',
            error: err
        });
    }
}

exports.getMovieById = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await movieById(id)

        return resp.status(200).json({
            isSuccess: true,
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching movie by id',
            error: err
        });
    }
}

exports.createMovie = async (req, resp) => {
    try {
        let data = await addMovie(req.body)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new movie',
            error: err
        });
    }
}

exports.updateMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMovie(id,req.body);
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error updating movie',
            error: err
        });
    }
}

exports.removeMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMovie(id)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error deleting movie',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allMovies = function () {
    return new Promise((resolve, reject) => {
        Movie.find({}, function (err, movies) {
            if (err) {
                reject(err);
            }
            else {
                resolve(movies);
            }
        })
    })
}

const movieById = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id, function (err, movie) {
            if (err) {
                reject(err);
            }
            else {
                resolve(movie);
            }
        })
    })
}

const addMovie = function (movieObj) {
    return new Promise((resolve, reject) => {
        const movie = new Movie({...movieObj});
        movie.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Movie Created',_id:movie._id});
            }
        })
    })
}

const changeMovie = function (id, movieObj) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(id,{...movieObj},{new: true},
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({msg:'Movie Updated',_id:id});
                }
            })
    })
}

const deleteMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Movie Deleted',_id:id});
            }
        })

    })
}
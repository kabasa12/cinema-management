const Movie = require('./moviesSchema');

exports.getAllMovies = async (req, resp) => {
    try {
        let data = await allMovies()
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Movies not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching all movies'},
            error: err
        });
    }
}

exports.getMovieById = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await movieById(id)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Movie not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching movie by id'},
            error: err
        });
    }
}

exports.createMovie = async (req, resp) => {
    try {
        let data = await addMovie(req.body)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Movies not created"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error creating new movie'},
            error: err
        });
    }
}

exports.updateMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMovie(id,req.body);
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Movies not updated"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error updating movie'},
            error: err
        });
    }
}

exports.removeMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMovie(id)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Movies not deleted"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error deleting movie'},
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
        movie.save(function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    })
}

const changeMovie = function (id, movieObj) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(id,{...movieObj},{new: true},
            function (err,res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            })
    })
}

const deleteMovie = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(id, function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })

    })
}
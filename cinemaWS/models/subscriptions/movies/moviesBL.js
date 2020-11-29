const moviesDal = require('../../../dals/subscriptions/movies/moviesDal')

//-----------------------Movies handlers-------------------------------------//

exports.getAllMovies = async (req, resp) => {
    try {
        let data = await allMovies();
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching all movies'},
            error: err
        });
    }
}

exports.getMovieById = async (req, resp) => {
    try {
        let id = req.params.id
        let data = await movieById(id)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching movie by id'},
            error: err
        });
    }
}

exports.createMovie = async (req, resp) => {
    try {
        let data = await addMovie(req.body)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - creating new movie'},
            error: err
        });
    }
}

exports.updateMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMovie(id,req.body);
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - updating movie'},
            error: err
        });
    }
}

exports.removeMovie = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMovie(id)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - deleting movie'},
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allMovies = async () => {
    let resp = await moviesDal.getAllMovies();
    return resp
}

const movieById = async (id) => {
    let resp = await moviesDal.getMovieById(id);
    return resp
}

const addMovie = async (movieObj) => {
    let resp = await moviesDal.addMovie(movieObj);
    return resp
}

const changeMovie = async (id,movieObj) => {
    let resp = await moviesDal.updateMovie(id,movieObj);
    return resp
}

const deleteMovie = async (id) => {
    let resp = await moviesDal.deleteMovie(id);
    return resp
}
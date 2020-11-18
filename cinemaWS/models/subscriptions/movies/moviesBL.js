const moviesDal = require('../../../dals/subscriptions/movies/moviesDal')

//-----------------------Movies handlers-------------------------------------//

exports.getAllMovies = async (req, resp) => {
    try {
        // const cookies = req.cookies;
        // console.log(cookies['access-token'])
        // console.log(cookies['refresh-token'])
        let data = await allMovies();
        return resp.status(200).json({ 
            isSuccess: true,
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error cinemaWS - fetching all movies',
            error: err
        });
    }
}

exports.getMovieById = async (req, resp) => {
    try {
        let id = req.params.id
        let data = await movieById(id)
        return resp.status(200).json({ 
            isSuccess: true,
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error cinemaWS - fetching movie by id',
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
            msg: 'Error cinemaWS - creating new movie',
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
            msg: 'Error cinemaWS - updating movie',
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
            msg: 'Error cinemaWS - deleting movie',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allMovies = async () => {
    let allMovies = await moviesDal.getAllMovies();
    return allMovies.data
}

const movieById = async (id) => {
    let resp = await moviesDal.getMovieById(id);
    return resp.data
}

const addMovie = async (movieObj) => {
    let resp = await moviesDal.addMovie(movieObj);
    return resp.data
}

const changeMovie = async (id,movieObj) => {
    let resp = await moviesDal.updateMovie(id,movieObj);
    return resp.data
}

const deleteMovie = async (id) => {
    let resp = await moviesDal.deleteMovie(id);
    return resp.data
}
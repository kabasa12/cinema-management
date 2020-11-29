const axios = require('axios');

//-----------------------Movies handlers-------------------------------------//
exports.getAllMovies = async () => {
    let movie = await axios.get('http://localhost:8200/api/movies');
    return movie.data
}

exports.getMovieById = async (id) => {
    let movie = await axios.get('http://localhost:8200/api/movies/' + id);
    return movie.data
}

exports.addMovie = async (movieObj) => {
    let movie = await axios.post('http://localhost:8200/api/movies',movieObj);
    return movie.data
}

exports.updateMovie = async (id,movieObj) => {
    let movie = await axios.put('http://localhost:8200/api/movies/' + id, movieObj);
    return movie.data
}

exports.deleteMovie = async (id) => {
    let movie = await axios.delete('http://localhost:8200/api/movies/' + id);
    return movie.data
}

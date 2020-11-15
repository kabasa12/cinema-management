const axios = require('axios');

//-----------------------Movies handlers-------------------------------------//
exports.getAllMovies = async () => {
    let allMovies = await axios.get('http://localhost:8200/api/movies');
    if(allMovies.data.isSuccess) {
        return allMovies.data
    } else return allMovies.msg
}

exports.getMovieById = async (id) => {
    let movie = await axios.get('http://localhost:8200/api/movies/' + id);
    if(movie.data.isSuccess) {
        return movie.data
    } else return movie.msg
}

exports.addMovie = async (movieObj) => {
    let movie = await axios.post('http://localhost:8200/api/movies',movieObj);
    if(movie.data.isSuccess) {
        return movie.data
    } else return movie.msg
}

exports.updateMovie = async (id,movieObj) => {
    let movie = await axios.put('http://localhost:8200/api/movies/' + id, movieObj);
    if(movie.data.isSuccess) {
        return movie.data
    } else return movie.msg
}

exports.deleteMovie = async (id) => {
    let movie = await axios.delete('http://localhost:8200/api/movies/' + id);
    if(movie.data.isSuccess) {
        return movie.data
    } else return movie.msg
}

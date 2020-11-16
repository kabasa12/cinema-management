import axios from 'axios';

const getMovies = async () => {
    let resp = await axios.get('http://localhost:8000/api/subscriptions/movies');
    return resp.data.data
  }

const getMovieById = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movies/${movieId}`);
    return resp.data.data;
}

const deleteMovie = async (movieId) => {
    let resp = await axios.delete(`http://localhost:8000/api/subscriptions/movies/${movieId}`);
    return resp.data;
}

const updateMovie = async (movieId,movieObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/movies/${movieId}`,movieObj);
    return resp.data;
}

const addMovie = async (movieObj) => {
    let resp = await axios.post(`http://localhost:8000/api/subscriptions/movies`,movieObj);
    return resp.data
}

export default {getMovies,deleteMovie,updateMovie,addMovie,getMovieById}
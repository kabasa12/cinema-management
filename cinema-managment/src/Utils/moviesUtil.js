import axios from 'axios';

const getMovies = async () => {
    let resp = await axios.get('http://localhost:8000/api/subscriptions/movies',
    { withCredentials: true,
        credentials: 'include'});
    return resp.data
  }

const getMovieById = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movies/${movieId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data.data;
}

const deleteMovie = async (movieId) => {
    let resp = await axios.delete(`http://localhost:8000/api/subscriptions/movies/${movieId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const updateMovie = async (movieId,movieObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/movies/${movieId}`,movieObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const addMovie = async (movieObj) => {
    let resp = await axios.post(`http://localhost:8000/api/subscriptions/movies`,movieObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data
}

export default {getMovies,deleteMovie,updateMovie,addMovie,getMovieById}
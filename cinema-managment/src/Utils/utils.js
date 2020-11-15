import axios from 'axios';

const getAll = async(url,type) => {
    let resp = await axios.get(url);
    let data = [];
    if(type === "members") {
        resp.data.map(d => {
            data.push({id:d.id,
                       name:d.name,
                       email:d.email,
                       city:d.address.city})
        });
    } else if(type === "movies") {
        resp.data.map(d => {
            let dt = new Date(d.premiered).getFullYear()
            data.push({id:d.id,
                       name:d.name,
                       image:d.image.medium,
                       premiered:dt,
                       genres:[...d.genres]})
        });
    }
    return data;
}

const getById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return resp.data;
}

const getMemberById = async (url,id) => {
    let resp = await axios.get(url + `/${id}`);
    return {id:resp.data.id,
            name:resp.data.name,
            email:resp.data.email,
            city:resp.data.address.city};
}

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

const getSubscriptions = async () => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions`);
    return resp.data.data;
}

const getSubscriptionByMemberId = async (memberId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/member/${memberId}`);
    return resp.data.data;
}

const getSubscriptionByMovieId = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
    return resp.data;
}

const updateSubscription = async (subscriptionId,subscriptionObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/${subscriptionId}`,subscriptionObj);
    return resp.data
}

const loginUser = async (userName,password) => {
    let resp = await axios.post('http://localhost:8000/api/users/login',{userName,password},
    { withCredentials: true,
      credentials: 'include',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }});
    
    return resp.data
}

const getMovieSubsc = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
    return resp.data.data
}
export default {getAll,getById,getMemberById,
                getSubscriptions,getMovies,loginUser,getMovieSubsc,
                getSubscriptionByMovieId,deleteMovie,
                updateSubscription,
                getMovieById,getSubscriptionByMemberId}
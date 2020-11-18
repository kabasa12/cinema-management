import axios from 'axios';

const getMovieSubsc = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
    return resp.data.data
}

const getSubscriptions = async () => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions`);
    return resp.data.data;
}

const getSubscriptionByMemberId = async (memberId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/member/${memberId}`);
    return resp.data;
}

const getSubscriptionByMovieId = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
    return resp.data;
}

const updateSubscription = async (subscriptionId,subscriptionObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/${subscriptionId}`,subscriptionObj);
    return resp.data;
}

const deleteSubscription = async (subscriptionId) => {
    let resp = await axios.delete(`http://localhost:8000/api/subscriptions/${subscriptionId}`);
    return resp.data;
}

const addSubscription = async (subscriptionObj) => {
    let resp = await axios.post(`http://localhost:8000/api/subscriptions`,subscriptionObj);
    return resp.data;
}

export default {getMovieSubsc, getSubscriptions,
    getSubscriptionByMovieId,deleteSubscription,
    updateSubscription,getSubscriptionByMemberId,addSubscription}
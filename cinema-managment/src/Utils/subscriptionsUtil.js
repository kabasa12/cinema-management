import axios from 'axios';

const getSubscriptions = async () => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data.data;
}

const getSubscriptionByMemberId = async (memberId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/member/${memberId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const getSubscriptionByMovieId = async (movieId) => {
    let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

// const getMovieSubsc = async (movieId) => {
//     let resp = await axios.get(`http://localhost:8000/api/subscriptions/movie/${movieId}`);
//     return resp.data.data
// }

const updateSubscription = async (subscriptionId,subscriptionObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/${subscriptionId}`,subscriptionObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const deleteSubscription = async (subscriptionId) => {
    let resp = await axios.delete(`http://localhost:8000/api/subscriptions/${subscriptionId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const addSubscription = async (subscriptionObj) => {
    let resp = await axios.post(`http://localhost:8000/api/subscriptions`,subscriptionObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

export default {getSubscriptions,getSubscriptionByMovieId,deleteSubscription,
                updateSubscription,getSubscriptionByMemberId,addSubscription}
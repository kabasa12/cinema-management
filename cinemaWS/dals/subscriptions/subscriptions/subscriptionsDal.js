const axios = require('axios');

//-----------------------Subscriptions handlers-------------------------------------//
exports.getAllSubscriptions = async () => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions');
    return subscription.data
}

exports.getSubscriptionById = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/' + id);
    return subscription.data
}

exports.getSubscriptionByMemberId = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/member/' + id);
    return subscription.data
}

exports.getSubscriptionByMovieId = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/movie/' + id);
    return subscription.data
}

exports.addSubscription = async (subscriptionObj) => {
    let subscription = await axios.post('http://localhost:8200/api/subscriptions',subscriptionObj);
    return subscription.data
}

exports.updateSubscription = async (id,subscriptionObj) => {
    let subscription = await axios.put('http://localhost:8200/api/subscriptions/' + id, subscriptionObj);
    return subscription.data
}

exports.deleteSubscription = async (id) => {
    let subscription = await axios.delete('http://localhost:8200/api/subscriptions/' + id);
    return subscription.data
}
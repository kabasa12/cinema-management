const axios = require('axios');

//-----------------------Subscriptions handlers-------------------------------------//
exports.getAllSubscriptions = async () => {
    let allSubscriptions = await axios.get('http://localhost:8200/api/subscriptions');
    if(allSubscriptions.data.isSuccess) {
        return allSubscriptions.data
    } else return allSubscriptions.msg
}

exports.getSubscriptionById = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/' + id);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.msg
}

exports.getSubscriptionByMemberId = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/member/' + id);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.data
}

exports.getSubscriptionByMovieId = async (id) => {
    let subscription = await axios.get('http://localhost:8200/api/subscriptions/movie/' + id);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.msg
}

exports.addSubscription = async (subscriptionObj) => {
    let subscription = await axios.post('http://localhost:8200/api/subscriptions',subscriptionObj);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.msg
}

exports.updateSubscription = async (id,subscriptionObj) => {
    let subscription = await axios.put('http://localhost:8200/api/subscriptions/' + id, subscriptionObj);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.msg
}

exports.deleteSubscription = async (id) => {
    let subscription = await axios.delete('http://localhost:8200/api/subscriptions/' + id);
    if(subscription.data.isSuccess) {
        return subscription.data
    } else return subscription.msg
}
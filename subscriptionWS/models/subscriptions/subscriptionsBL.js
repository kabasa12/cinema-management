const Subscribe = require('./subscriptionsSchema');
const mongoose = require('mongoose');

exports.getAllSubscriptions = async (req, resp) => {
    try {
        let data = await allSubscriptions()
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching all subscriptions',
            error: err
        });
    }
}

exports.getSubscriptionById = async (req, resp) => {
    try {
        let subscriptionId = req.params.id;
        let data = await subscriptionById(subscriptionId)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching all subscriptions',
            error: err
        });
    }
}

exports.getSubscriptionByMemberId = async (req, resp) => {
    try {
        let memberId = req.params.id;
        let data = await subscriptionByMemberId(memberId)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching subscription by member',
            error: err
        });
    }
}

exports.getSubscriptionByMovieId = async (req, resp) => {
    try {
        let movieId = req.params.id;
        let data = await subscriptionByMovieId(movieId)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching subscription by movies',
            error: err
        });
    }
}

exports.createSubscription = async (req, resp) => {
    try {
        let data = await addSubscription(req.body)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new subscription',
            error: err
        });
    }
}

exports.updateSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeSubscription(id,req.body)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new subscription',
            error: err
        });
    }
}

exports.removeSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteSubscription(id)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new subscription',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allSubscriptions = function () {
    return new Promise((resolve, reject) => {
        Subscribe.find({}, function (err, subscriptions) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscriptions);
            }
        })
    })
}

const subscriptionById = function (id) {
    return new Promise((resolve, reject) => {
        Subscribe.findById(id, function (err, subscription) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscription);
            }
        })
    })
}

const subscriptionByMemberId = function (memberId) {
    return new Promise((resolve, reject) => {
        Subscribe.findOne({"memberId" : memberId}, function (err, subscription) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscription);
            }
        })
    })
}

const subscriptionByMovieId = function (movieId) {
    return new Promise((resolve, reject) => {
        Subscribe.find({"movies.movieId":movieId}, function (err, subscription) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscription);
            }
        })
    })
}

const addSubscription = function (subscriptionObj) {
    return new Promise((resolve, reject) => {
        const subscribe = new Subscribe({...subscriptionObj});
        subscribe.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Subscription Created',id:subscribe._id});
            }
        })
    })
}

const changeSubscription = function (id, subscriptionObj) {
    return new Promise((resolve, reject) => {
        Subscribe.findByIdAndUpdate(id,{...subscriptionObj}, 
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({msg:'Subscription Updated',_id:id});
                }
            })
    })
}

const deleteSubscription = function (id) {
    return new Promise((resolve, reject) => {
        Subscribe.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Subscription Deleted',_id:id});
            }
        })

    })
}


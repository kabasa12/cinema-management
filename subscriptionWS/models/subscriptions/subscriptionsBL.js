const Subscribe = require('./subscriptionsSchema');
const mongoose = require('mongoose');

exports.getAllSubscriptions = async (req, resp) => {
    try {
        let data = await allSubscriptions();
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Subscriptions not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching all subscriptions'},
            error: err
        });
    }
}

exports.getSubscriptionById = async (req, resp) => {
    try {
        let subscriptionId = req.params.id;
        let data = await subscriptionById(subscriptionId)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Subscription not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching subscription by id'},
            error: err
        });
    }
}

exports.getSubscriptionByMemberId = async (req, resp) => {
    try {
        let memberId = req.params.id;
        let data = await subscriptionByMemberId(memberId)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - No Subscriptions found for member"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching subscription by member'},
            error: err
        });
    }
}

exports.getSubscriptionByMovieId = async (req, resp) => {
    try {
        let movieId = req.params.id;
        let data = await subscriptionByMovieId(movieId)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - No Subscriptions found for movie"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching subscription by movies'},
            error: err
        });
    }
}

exports.createSubscription = async (req, resp) => {
    try {
        let data = await addSubscription(req.body)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Subscriptions not created"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error creating new subscription'},
            error: err
        });
    }
}

exports.updateSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeSubscription(id,req.body)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Subscriptions not updated"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error updating subscription'},
            error: err
        });
    }
}

exports.removeSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteSubscription(id)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Subscriptions not deleted"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error deleting subscription'},
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
        subscribe.save(function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    })
}

const changeSubscription = function (id, subscriptionObj) {
    return new Promise((resolve, reject) => {
        Subscribe.findByIdAndUpdate(id,{...subscriptionObj}, 
            function (err,res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            })
    })
}

const deleteSubscription = function (id) {
    return new Promise((resolve, reject) => {
        Subscribe.findByIdAndDelete(id, function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })

    })
}


const subscriptionsDal = require('../../../dals/subscriptions/subscriptions/subscriptionsDal');
const membersDal = require('../../../dals/subscriptions/members/membersDal');
const moviesDal = require('../../../dals/subscriptions/movies/moviesDal');

//-----------------------Subscriptions handlers-------------------------------------//
exports.getAllSubscriptions = async (req, resp) => {
    try {
        let data = await allSubscriptions()      
        if(data){
            return resp.status(200).json({ 
                isSuccess: true,
                data:data});
        } else {
            return resp.status(203).json({ 
                isSuccess: false,
                data:{msg:"Couldn't find subscriptions"}});
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching all members'},
            error: err
        });
    }
}

exports.getSubscriptionById = async (req, resp) => {
    try {
        let id = req.params.id
        let data = await subscriptionById(id)        
        if(data){
            return resp.status(200).json({ 
                isSuccess: true,
                data:data});
        } else {
            return resp.status(203).json({ 
                isSuccess: false,
                data:{msg:"Couldn't find specific subscription"}});
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching subscription by id'},
            error: err
        });
    }
}

exports.getSubscriptionByMemberId = async (req, resp) => {
    try {
        let memberId = req.params.id
        let data = await subscriptionByMemberId(memberId)  
        if(data){
            return resp.status(200).json({ 
                isSuccess: true,
                data:data});
        } else {
            return resp.status(203).json({ 
                isSuccess: false,
                data:{msg:"Couldn't find member subscriptions"}});
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching subscription by member id'},
            error: err
        });
    }
}

exports.getSubscriptionByMovieId = async (req, resp) => {
    try {
        let movieId = req.params.id
        let data = await subscriptionByMovieId(movieId)

        if(data.length > 0){
            return resp.status(200).json({ 
                isSuccess: true,
                data:data});
        } else {
            return resp.status(203).json({ 
                isSuccess: false,
                data:{msg:"Couldn't find movie subscriptions"}});
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching subscription by movie id'},
            error: err
        });
    }
}

exports.createSubscription =  async (req, resp) => {
    try {
        let data = await addSubscription(req.body);
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - creating new subscription'},
            error: err
        });
    }
}

exports.updateSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeSubscription(id,req.body)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
        
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - creating new subscription'},
            error: err
        });
    }
}

exports.removeSubscription = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteSubscription(id)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - creating new subscription'},
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allSubscriptions = async () => {
    let subscriptionsData = await subscriptionsDal.getAllSubscriptions();
    if(!subscriptionsData.isSuccess) return null;

    let allSubscriptions = subscriptionsData.data
    let allMembers = await membersDal.getAllMembers();
    if(!allMembers.isSuccess) return null;

    let subscriptions = await Promise.all(allSubscriptions.map(async subsc => {
        let member = await membersDal.getMembereById(subsc.memberId);
        let movies = await Promise.all(subsc.movies.map( async movie => {
            let movieData = await moviesDal.getMovieById(movie.movieId);
            return ({movieId:movie.movieId,name:movieData.data.name,watchDate:movie.watchDate})
        }))
        return ({ _id:subsc._id,
                memberId:subsc.memberId,
                member:member.data.userName,
                email:member.data.email,
                city:member.data.city,
                movies
            })
    }))
    //Add members without subscription
    let allMemmbersData = allMembers.data.map(member => {
        if(allSubscriptions.findIndex(subs => subs.memberId == member._id) == -1)
            return({_id:member._id,
                    memberId:member._id,
                    member:member.userName,
                    email:member.email,
                    city:member.city
                })
    }).filter(x=> x)

    subscriptions = [...subscriptions,...allMemmbersData]

    function compare( a, b ) {
        if ( a.memberId < b.memberId ){
          return -1;
        }
        if ( a.memberId > b.memberId ){
          return 1;
        }
        return 0;
      }
      
    subscriptions.sort( compare );

    return subscriptions
}

const subscriptionById = async (id) => {
    let subscriptionData = await subscriptionsDal.getSubscriptionById(id);
    if (!subscriptionData.isSuccess) return null;

    let subscription = subscriptionData.data
    let member = await membersDal.getMembereById(subscription.memberId);
    if (!member.isSuccess) return null;

    let resSubscription = {_id:id,
                            memberId:subscription.memberId,
                            member:member.data.userName,
                            email:member.data.email
                            }                     
    let movies = await Promise.all(subscription.movies.map( async movie => {
        let movieData = await moviesDal.getMovieById(movie.movieId);
        return ({movieId:movie.movieId,name:movieData.data.name,watchDate:movie.watchDate})
    }))
    resSubscription = {...resSubscription,movies}

    return resSubscription
}

const subscriptionByMemberId = async (memberId) => {
    let subscriptionData = await subscriptionsDal.getSubscriptionByMemberId(memberId);
    if(!subscriptionData.isSuccess) return null;

    let subscription = subscriptionData.data
    let member = await membersDal.getMembereById(memberId);
    if(!member.isSuccess) return null;

    let resSubscription = {_id:subscription._id,
                            memberId:subscription.memberId,
                            member:member.data.userName,
                            email:member.data.email
                            }                     
    let movies = await Promise.all(subscription.movies.map( async movie => {
        let movieData = await moviesDal.getMovieById(movie.movieId);
        return ({movieId:movie.movieId,name:movieData.data.name,watchDate:movie.watchDate})
    }))
    resSubscription = {...resSubscription,movies}

    return resSubscription;
}

const subscriptionByMovieId = async (movieId) => {
    let subscriptionData = await subscriptionsDal.getSubscriptionByMovieId(movieId);
    if(!subscriptionData.isSuccess) return null;

    let allSubscriptions = subscriptionData.data
    let subscriptions = await Promise.all(allSubscriptions.map(async subsc => {
        let member = await membersDal.getMembereById(subsc.memberId);
        let movies = await Promise.all(subsc.movies.map( async movie => {

            if(movie.movieId == movieId) {
                let movieData = await moviesDal.getMovieById(movie.movieId);
                return ({movieId:movie.movieId,name:movieData.data.name,watchDate:movie.watchDate,moviesData:subsc.movies})
            } else {
                return;
            }
        }))
        let foundMovies = movies.filter(x => x )
        if(foundMovies.length > 0) {
            let fitMovies = foundMovies[0].watchDate
            let moviesData = foundMovies[0].moviesData
            
            return ({ _id:subsc._id,
                    memberId:subsc.memberId,
                    member:member.data.userName,
                    email:member.data.email,
                    watchDate:fitMovies,
                    movies:moviesData
                })
        }
        return null
    }))
    return subscriptions
}

const addSubscription = async (subscriptionObj) => {
    let resp = await subscriptionsDal.addSubscription(subscriptionObj);
    return resp;
}

const changeSubscription = async (id,subscriptionObj) => {
    let resp = await subscriptionsDal.updateSubscription(id,subscriptionObj);
    return resp;
}

const deleteSubscription = async (id) => {
    let resp = await subscriptionsDal.deleteSubscription(id);
    return resp;
}
const membersDal = require('../dals/members/membersDal');
const moviesDal = require('../dals/movies/moviesDal');
const membersBL = require('./members/membersBL');
const moviesBL = require('./movies/moviesBL');

exports.getAllPersons = async () => {
    return await membersBL.getAllMembers();
}

exports.insertDataForSubscriptionDB = async function () {
    let membersResp = await membersDal.getMembers();
    let members = membersResp.data;

    members.forEach(async (member, key) => {
        await membersBL.addMember({...member})
    });

   let moviesResp = await moviesDal.getMovies();
   let movies = moviesResp.data;

   movies.forEach(async (movie, key) => {
       await moviesBL.addMovie({...movie})
   });
}
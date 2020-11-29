const express = require('express');
const router = express.Router();
const SubscriptionsBL = require('../../models/subscriptions/subscriptions/subscriptionsBL');
const MoviesBL = require('../../models/subscriptions/movies/moviesBL');
const MembersBL = require('../../models/subscriptions/members/membersBL');
const auth = require('../../models/auth/jwtAuth');

//-----------------------Movies handlers-------------------------------------//
router.get('/movies', auth, MoviesBL.getAllMovies);
router.get('/movies/:id',auth, MoviesBL.getMovieById);
router.post('/movies',auth, MoviesBL.createMovie);
router.put('/movies/:id',auth, MoviesBL.updateMovie);
router.delete('/movies/:id',auth, MoviesBL.removeMovie);

//-----------------------Members handlers-------------------------------------//
router.get('/members', MembersBL.getAllMembers);
router.get('/members/:id', MembersBL.getMemberById );
router.post('/members',auth, MembersBL.createMember);
router.put('/members/:id',auth, MembersBL.updateMember);
router.delete('/members/:id',auth, MembersBL.removeMember);

//-----------------------Subscriptions handlers-------------------------------------//
router.get('/', auth, SubscriptionsBL.getAllSubscriptions);
router.get('/:id', SubscriptionsBL.getSubscriptionById);
router.get('/member/:id',auth, SubscriptionsBL.getSubscriptionByMemberId);
router.get('/movie/:id',auth, SubscriptionsBL.getSubscriptionByMovieId);
router.post('/',auth, SubscriptionsBL.createSubscription);
router.put('/:id',auth, SubscriptionsBL.updateSubscription);
router.delete('/:id',auth, SubscriptionsBL.removeSubscription);




module.exports = router;
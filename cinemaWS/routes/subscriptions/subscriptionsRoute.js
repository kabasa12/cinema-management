const express = require('express');
const router = express.Router();
const SubscriptionsBL = require('../../models/subscriptions/subscriptions/subscriptionsBL');
const MoviesBL = require('../../models/subscriptions/movies/moviesBL');
const MembersBL = require('../../models/subscriptions/members/membersBL');
const auth = require('../../models/auth/jwtAuth');

//-----------------------Movies handlers-------------------------------------//
router.get('/movies',auth, MoviesBL.getAllMovies);
router.get('/movies/:id', MoviesBL.getMovieById);
router.post('/movies', MoviesBL.createMovie);
router.put('/movies/:id', MoviesBL.updateMovie);
router.delete('/movies/:id', MoviesBL.removeMovie);

//-----------------------Members handlers-------------------------------------//
router.get('/members', MembersBL.getAllMembers);
router.get('/members/:id', MembersBL.getMemberById );
router.post('/members', MembersBL.createMember);
router.put('/members/:id', MembersBL.updateMember);
router.delete('/members/:id', MembersBL.removeMember);

//-----------------------Subscriptions handlers-------------------------------------//
router.get('/', SubscriptionsBL.getAllSubscriptions);
router.get('/:id', SubscriptionsBL.getSubscriptionById);
router.get('/member/:id', SubscriptionsBL.getSubscriptionByMemberId);
router.get('/movie/:id', SubscriptionsBL.getSubscriptionByMovieId);
router.post('/', SubscriptionsBL.createSubscription);
router.put('/:id', SubscriptionsBL.updateSubscription);
router.delete('/:id', SubscriptionsBL.removeSubscription);




module.exports = router;
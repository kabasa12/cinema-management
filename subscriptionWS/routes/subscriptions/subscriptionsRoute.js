const express = require('express');
const router = express.Router();
const SubscriptionsBL = require('../../models/subscriptions/subscriptionsBL');


router.get('/', SubscriptionsBL.getAllSubscriptions);
router.get('/:id', SubscriptionsBL.getSubscriptionById);
router.get('/member/:id', SubscriptionsBL.getSubscriptionByMemberId);
router.get('/movie/:id', SubscriptionsBL.getSubscriptionByMovieId);
router.post('/', SubscriptionsBL.createSubscription);
router.put('/:id', SubscriptionsBL.updateSubscription);
router.delete('/:id', SubscriptionsBL.removeSubscription);


module.exports = router;
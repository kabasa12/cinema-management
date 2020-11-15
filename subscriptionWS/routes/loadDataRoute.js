const express = require('express');
const router = express.Router();
const loadDataBL = require('../models/loadDataBL');


router.route('/')
    .get(async function (req, resp) {
        try {
        await loadDataBL.insertDataForSubscriptionDB()
        return resp.status(200).json({ isSucess: true });
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating subscription data from web services to db',
            error: err
        });
    }
});

module.exports = router;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const refresh = require('./tokenRefresh');

module.exports = authenticateToken = async (req, res, next) => {

    const cookies = req.cookies

    if (cookies['access-token'] == null) { console.log("authenticateToken token null"); return res.sendStatus(401)}

    jwt.verify(cookies['access-token'], process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err && !cookies['refresh-token']) return res.sendStatus(403)
        else if (err && cookies['refresh-token']) {
            try {
                refresh.tokenRefresh(req, res, cookies['refresh-token'])
            }
            catch (err) {
                res.sendStatus(err)
            }
        }

        try {
            //req.user = 
            next()
        }
        catch (err) {
            res.sendStatus(err)
        }
    });
}

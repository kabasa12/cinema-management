const jwt = require('jsonwebtoken')
const AuthBL = require('./authBL')

exports.tokenRefresh = async (req, res, tokenObj) => {
    try {
        let token = await AuthBL.getToken(tokenObj);
        if (token == null) throw 403

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            const _user = {
                _id: user._id,
            }
            req.cookies.token = jwt.sign(_user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            return _user
        });

    }
    catch (err) {
        if(err != 403)
            throw 500
        else
            throw 403
    }
}
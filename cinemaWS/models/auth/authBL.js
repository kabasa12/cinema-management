const AuthDb = require('./authSchema');

exports.getTokenByName = async (req,resp) => {
    try {
        let token = req.body;//replace from cookie
        let data = await getToken(token);
        return resp.status(200).json({
            isSuccess:true,
            data:data
        })
    } catch(err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching token',
            error: err
        });
    }
}

exports.createToken = async (tokenObj) => {
    try {
        //let token = req.body;//replace from cookie
        let data = await addToken(tokenObj);
        return ({
            isSuccess:true,
            data:data
        })
    } catch(err) {
        return ({
            isSuccess: false,
            msg: 'Error creating new token',
            error: err
        });
    }
}

exports.removeToken = async (req, resp) => {
    try {
        let token = req.params.token;//replace from cookie
        let tokenData = await getToken({token:token});
        console.log(token)
        console.log(tokenData)
        let data = await deleteToken(tokenData._id)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error deleting Token',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const getToken = function (tokenObj) {
    return new Promise((resolve, reject) => {
        AuthDb.findOne({"token" : tokenObj.token}, function (err, token) {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        })
    })
}

const addToken = function (token) {
    return new Promise((resolve, reject) => {
        const tokenDb = new AuthDb({...token});
        tokenDb.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({ msg: 'Token Created', _id: tokenDb._id });
            }
        })
    })
}

const deleteToken = function (id) {
    return new Promise((resolve, reject) => {
        AuthDb.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Token Deleted',_id:id});
            }
        })

    })
}
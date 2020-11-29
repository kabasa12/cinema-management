const AuthDb = require('./authSchema');

exports.getTokenByName = async (tokenObj) => {
    try {
        let data = await getToken(tokenObj);
        return ({
            isSuccess:true,
            data:data
        })
    } catch(err) {
        return ({
            isSuccess: false,
            msg: 'Error fetching token',
            error: err
        });
    }
}

exports.createToken = async (tokenObj) => {
    try {

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

exports.removeToken = async (token) => {
    try {
        let tokenData = await getToken({token:token});
        let data = await deleteToken(tokenData._id)
        return ({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return ({
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
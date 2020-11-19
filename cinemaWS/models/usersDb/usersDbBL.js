const UsersDb = require('./usersDbSchema');
const UsersBL = require('../users/usersBL');
const AuthBL = require('../auth/authBL');
const axios = require('axios')
const PermissionBL = require('../permissions/permissionsBL')
const saltRounds = 10;

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, resp) => {
    try {
        let userData = req.body;
        let user = await fingUserByName(userData);

        let match = bcrypt.compareSync(userData.password, user.password);
        if (match) {
            if (userData.password == process.env.DEFAULT_PASSWORD) {
                return resp.status(401).json({
                    isSuccess: false,
                    data: { msg: "You need to Create Account with new password", status: 1 }
                });
            } else {
                let accessToken = await generateToken(user);
                let refreshToken = jwt.sign({_id:user._id}, process.env.REFRESH_TOKEN_SECRET);
                let userDetails = await axios.get('http://localhost:8000/api/users/' + user._id);
                
                try{
 
                    await AuthBL.createToken({token:refreshToken});

                    resp.cookie('access-token', accessToken, { maxAge: (60 * 30 * 24 * 7), httpOnly: true, sameSite: true});
                    resp.cookie('refresh-token', refreshToken, { maxAge: (60 * 60 * 24 * 7), httpOnly: true, sameSite: true });
                    
                    return resp.status(200).json({
                        isSuccess: true,
                        ...userDetails.data
                    });
                } catch(err) {
                    return resp.status(500).json({
                        isSuccess: false,
                        data:{msg:"Error - Please try again later"}
                    });
                }
            }
        } else {
            return resp.status(401).json({
                isSuccess: false,
                data: { msg: "Wrong user name or password", status: 2 }
            });
        }
    } catch (err) {
        return resp.status(404).json({
            isSuccess: false,
            msg: 'User Not exists',
            status: 3
        });
    }
}

const logOut = async (req,resp) => {
    const cookies = req.cookies;

    if (!cookies['refresh-token'] && !cookies['access-token'])
        return resp.status(400).json({
            isSuccess: false,
            msg: 'Token Not exists in cookies'
        });

    try {
        let logout = await AuthBL.removeToken(cookies['refresh-token']);
        if(logout.isSuccess) {
            resp.clearCookie('refresh-token', {sameSite: true}).clearCookie('access-token', {sameSite: true}).status(200).json({
                isSuccess:true,
                data:{msg:"Token removed", _id:logout._id}
            })     
        }
    } catch(err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg:"Error logout - Please try again later"}
        }); 
    }
}

const createAccount = async (req, resp) => {
    try {
        let userData = req.body;
        let user = await fingUserByName(userData)
        
        if (user._id) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userData.password, salt);

            let userDbObj = { userName: user.userName, password: hash }
            let userDb = await updateUserDb(user._id, userDbObj);
            if (!userDb._id) {
                return resp.status(501).json({
                    isSuccess: false,
                    msg: "Error update user password in Db"
                })
            } else {
                return resp.status(200).json({
                    isSuccess: true,
                    data: { _id: userDb._id }
                });
            }
        } else {
            return resp.status(404).json({
                isSuccess: false,
                msg: 'User Not exists',
                status: 3
            });
        }
    } catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: "Error CinamaWs - creating account",
        });
    }
}

const getAllUsers = async (req, resp) => {
    try {
        let usersData = await UsersBL.getAllUsers();
        let usersDbData = await getAllUsersDb();
        let permissionData = await PermissionBL.getAllPermissions();
        let msg = "Success";

        let allusersData = usersData.map(user => {
            let userDb = usersDbData.filter(data => data._id == user._id)
            let userName = userDb[0].userName;
            let isAdmin = userDb[0].isAdmin;

            let userPermissions = permissionData.filter(perm => perm._id == user._id)
            if (userPermissions.length > 0 && userDb.length > 0) {
                userPermissions = userPermissions[0].permissions;
                return { ...user, userName, isAdmin, permissions: userPermissions }
            } else {
                msg = "Error - some users are lacking information in db files";
                return msg
            }
        })
        if (msg == "Success") {
            return resp.status(200).json({
                isSuccess: true,
                data: allusersData
            });
        } else {
            return resp.status(401).json({
                isSuccess: false,
                data: msg
            });
        }

    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching all users',
            error: err
        });
    }
}

const getUserById = async (req, resp) => {
    try {
        let id = req.params.id;
        let userData = await UsersBL.getUserById(id);
        let userDbData = await getUserDbById(id);
        let permissionData = await PermissionBL.getPermissionByUserId(id);
        let msg = "Success";

        if (permissionData.length > 0 && userData) {
            return resp.status(200).json({
                isSuccess: true,
                data: { ...userData, userName: userDbData.userName,isAdmin:userDbData.isAdmin, permissions: permissionData }
            });
        } else {
            msg = "Error - some users are lacking information in db files";
            return resp.status(401).json({
                isSuccess: false,
                data: msg
            });
        }

    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching user by id',
            error: err
        });
    }
}

const addUser = async (req, resp) => {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(process.env.DEFAULT_PASSWORD, salt);
        let userDbObj = {
            userName: req.body.userName,
            password: hash,
            isAdmin: false
        }

        let userDbData = await addUserDb(userDbObj)
        if (!userDbData._id) {
            return resp.status(501).json({
                isSuccess: false,
                msg: "Error create new user in Db"
            })
        } else {
            let userData = await UsersBL.addUser({ _id: userDbData._id, ...req.body });
            if (userData == "Success") {
                let permObj = {
                    _id: userDbData._id,
                    permissions: req.body.permissions
                }

                let permData = await PermissionBL.addPermission(permObj)
                if (permData == "Success")
                    return resp.status(200).json({
                        isSuccess: true,
                        data: {
                            _id: userDbData._id,
                            userName: req.body.userName,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            createdDate: req.body.createdDate,
                            sessionTimeOut: req.body.sessionTimeOut,
                            permissions: req.body.permissions
                        }
                    });
            }
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new user',
            error: err
        });
    }
}

const updateUser = async (req, resp) => {
    try { 
        let id = req.params.id;
        let userDbData = await getUserDbById(id)
        let userDbObj = { userName: req.body.userName, password: userDbData.password }
        let userDb = await updateUserDb(id, userDbObj);

        if (!userDb._id) {
            return resp.status(501).json({
                isSuccess: false,
                msg: "Error update user in Db"
            })
        } else {
            let userData = await UsersBL.updateUser(id, req.body);
            if (userData == "Success") {
                let permData = await PermissionBL.updatePermission(id, req.body.permissions);
                if (permData == "Success")
                    return resp.status(200).json({
                        isSuccess: true,
                        data: { _id: id, ...req.body }
                    });
            }
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error updating user',
            error: err
        });
    }
}

const deleteUser = async (req, resp) => {
    try {
        let id = req.params.id;
        let userDb = await deleteUserDb(id)
        if (!userDb._id) {
            return resp.status(501).json({
                isSuccess: false,
                msg: "Error delete user in Db"
            })
        } else {
            let userData = await UsersBL.deleteUser(id);
            if (userData == "Success") {
                let permData = await PermissionBL.deletePermission(id);
                if (permData == "Success") {
                    return resp.status(200).json({
                        isSuccess: true,
                        data: permData
                    });
                }
            }
        }
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error deleting movie',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const fingUserByName = (userData) => {
    return new Promise((resolve, reject) => {
        UsersDb.findOne({ "userName": userData.userName }, async (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user)
            }
        })
    })
}

const getAllUsersDb = function () {
    return new Promise((resolve, reject) => {
        UsersDb.find({},function (err, users) {
            if (err) {
                reject(err);
            }
            else {
                resolve(users);
            }
        })
    })
}

const getUserDbById = function (id) {
    return new Promise((resolve, reject) => {
        UsersDb.findById(id, function (err, user) {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        })
    })
}

const addUserDb = function (userDbObj) {
    return new Promise((resolve, reject) => {
        const userDb = new UsersDb({ ...userDbObj });
        userDb.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({ msg: 'UserDb Created', _id: userDb._id });
            }
        })
    })
}

const updateUserDb = function (id, userDbObj) {
    return new Promise((resolve, reject) => {
        UsersDb.findByIdAndUpdate(id, { ...userDbObj },{new: true},
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ msg: 'UserDb Updated', _id: id });
                }
            })
    })
}

const deleteUserDb = function (id) {
    return new Promise((resolve, reject) => {
        UsersDb.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({ msg: 'UserDb Deleted', _id: id });
            }
        })

    })
}

const generateToken = async (user) => {
    let resp = await UsersBL.getUserById(user._id);
    let userTimeOut = resp.sessionTimeOut;

    return jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m' });
}

module.exports = {getUserDbById,
                  deleteUser,
                  getUserById,
                  updateUser,
                  addUser,
                  getAllUsers,
                  createAccount,
                  login,logOut}
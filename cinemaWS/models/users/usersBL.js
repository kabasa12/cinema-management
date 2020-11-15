const usersDal = require('../../dals/users/usersDal');

exports.getAllUsers = async function () {
    try{
        let userData = await usersDal.readFile();
        return userData.users

    }catch(err){
        throw(err)
    }
}

exports.getUserById = async function (userId) {
    try{
        let usersData = await usersDal.readFile();
        let users = usersData.users;
        
        if(users.length > 0){
            return users.filter(user => user._id == userId )[0];
        }
    } catch(err) {
        throw(err)
    }
    
}

exports.addUser = async function (userObj) {
    try {
        let usersData = await usersDal.readFile();
        let users = usersData.users;
        if(userObj){
            let newUserObj = {_id:userObj._id,
                            firstName:userObj.firstName,
                            lastName:userObj.lastName,
                            createdDate:userObj.createdDate,
                            sessionTimeOut:userObj.sessionTimeOut
                            }
            users.push({...newUserObj});
            usersData = {...usersData, users:users};
            return await usersDal.writeFile(usersData);
        }
    } catch(err) {
        throw(err)
    }
    
}

exports.updateUser = async function (id, userObj) {
    let usersData = await usersDal.readFile();
    let users = usersData.users;
    if(users.length > 0 && userObj){
        let index = users.findIndex(user => user._id == id);
        if(index > -1){
            let newUserObj = {_id:id,
                            firstName:userObj.firstName,
                            lastName:userObj.lastName,
                            createdDate:userObj.createdDate,
                            sessionTimeOut:userObj.sessionTimeOut
                            }
            users[index] = newUserObj;
            usersData = {...usersData, users:users};
            return await usersDal.writeFile(usersData);
        }
    }
}

exports.deleteUser = async function (id) {
    let usersData = await usersDal.readFile();
    let users = usersData.users;
    
    if(users.length > 0 && id){
        let index = users.findIndex(user => user._id == id);
        if(index > -1){
            users.splice(index, 1);
            usersData = {...usersData, users:users};
            return await usersDal.writeFile(usersData);
        }
    }
}
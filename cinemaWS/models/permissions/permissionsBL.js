const permissionDal = require('../../dals/permissions/permissionsDal');

const userPermissions = [{id:"viewSubscriptions",name:"View Subscriptions",value:false},
                        {id:"createSubscriptions",name:"Create Subscriptions",value:false},
                        {id:"deleteSubscriptions",name:"Delete Subscriptions",value:false},
                        {id:"updateSubscriptions",name:"Update Subscriptions",value:false},
                        {id:"viewMovies",name:"View Movies",value:false},
                        {id:"createMovies",name:"Create Movies",value:false},
                        {id:"deleteMovies",name:"Delete Movies",value:false},
                        {id:"updateMovies",name:"Update Movies",value:false}];

exports.getAllPermissions = async function () {
    try{
        let permissionsData = await permissionDal.readFile();       
        let allUsersPermissionData =  permissionsData.usersPermissions;

        let allUsersPermission = allUsersPermissionData.map(allUserPermissionData => {
            let userPerm = allUserPermissionData.permissions
            let permissions = userPermissions.map(userPermission => {
                if (userPerm.includes(userPermission.id)) {
                    return ({...userPermission,value:true})
                } 
                return ({...userPermission})
            })
            return {_id:allUserPermissionData._id,permissions:permissions}
        })
        return allUsersPermission;
    }catch(err){
        throw(err)
    }
}

exports.getPermissionByUserId = async function (userId) {
    try{
        let permissionsData = await permissionDal.readFile();
        let permissions = permissionsData.usersPermissions;
        if(permissions.length > 0){
            let user =  permissions.filter(perm => perm._id == userId )[0];
            let userPerm = user.permissions;

            if (userPerm){
                let permission = userPermissions.map(userPermission => {
                    if (userPerm.includes(userPermission.id)) {
                        return ({...userPermission,value:true})
                    } 
                    return ({...userPermission})
                })
                return permission
            }
            return {msg:"Error - No data found"}
        } 
    } catch(err) {
        throw(err)
    }
    
}

exports.addPermission = async function (permissionObj) {
    try {
        let permissionsData = await permissionDal.readFile();
        let permissions = permissionsData.usersPermissions;

        if(permissionObj){
            permissions.push({...permissionObj});
            permissionsData = {...permissionsData, usersPermissions:permissions};
            return await permissionDal.writeFile(permissionsData);
        }
    } catch(err) {
        throw(err)
    }
    
}

exports.updatePermission = async function (id, permissionObj) {
    let permissionsData = await permissionDal.readFile();
    let permissions = permissionsData.usersPermissions;

    if(permissions.length > 0 && permissionObj){
        let index = permissions.findIndex(perm => perm._id == id);
        if(index > -1){
            permissions[index] = {_id:id,permissions:permissionObj};
            permissionsData = {...permissionsData,usersPermissions:permissions};
            return await permissionDal.writeFile(permissionsData);
        }
    }
}

exports.deletePermission = async function (id) {
    let permissionsData = await permissionDal.readFile();
    let permissions = permissionsData.usersPermissions;

    if(permissions.length > 0 && id){
        let index = permissions.findIndex(perm => perm._id == id);
        if(index > -1){
            permissions.splice(index, 1);
            permissionsData = {...permissionsData, usersPermissions:permissions};
            return await permissionDal.writeFile(permissionsData);
        }
    }
}
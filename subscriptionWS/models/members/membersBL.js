const Member = require('./membersSchema');

exports.getAllMembers = async (req, resp) =>{
    try {
        let data = await allMembers()
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching all members',
            error: err
        });
    }
}

exports.getMemberById = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await memberById(id)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error fetching member by id',
            error: err
        });
    }
}

exports.createMember = async (req, resp) => {
    try {
        let data = await addMember(req.body)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error creating new member',
            error: err
        });
    }
}

exports.updateMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMember(id,req.body)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error updating member',
            error: err
        });
    }
}

exports.removeMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMember(id)
        return resp.status(200).json({ 
            isSuccess: true, 
            data:data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            msg: 'Error deleting member',
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allMembers = function () {
    return new Promise((resolve, reject) => {
        Member.find({}, function (err, members) {
            if (err) {
                reject(err);
            }
            else {
                resolve(members);
            }
        })
    })
}

const memberById = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id, function (err, member) {
            if (err) {
                reject(err);
            }
            else {
                resolve(member);
            }
        })
    })
}

const addMember = function (memberObj) {
    return new Promise((resolve, reject) => {
        const member = new Member({...memberObj});
        member.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Member Created',_id:member._id});
            }
        })
    })
}

const changeMember = function (id, memberObj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id,{...memberObj}, 
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({msg:'Member Updated',_id:id});
                }
            })
    })
}

const deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({msg:'Member Deleted',_id:id});
            }
        })

    })
}
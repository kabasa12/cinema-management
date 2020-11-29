const Member = require('./membersSchema');

exports.getAllMembers = async (req, resp) =>{
    try {
        let data = await allMembers()
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Members not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching all members'},
            error: err
        });
    }
}

exports.getMemberById = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await memberById(id)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Member not found"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error fetching member by id'},
            error: err
        });
    }
}

exports.createMember = async (req, resp) => {
    try {
        let data = await addMember(req.body)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Member not created"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error creating new member'},
            error: err
        });
    }
}

exports.updateMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMember(id,req.body)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Member not updated"}});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error updating member'},
            error: err
        });
    }
}

exports.removeMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMember(id)
        if(data !== null)
            return resp.status(200).json({ 
                isSuccess: true, 
                data:data});
        return resp.status(203).json({ 
            isSuccess: false, 
            data:{msg:"Error - Member not deleted"}});
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
        member.save(function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    })
}

const changeMember = function (id, memberObj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id,{...memberObj},{new: true},
            function (err,res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            })
    })
}

const deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, function (err,res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })

    })
}
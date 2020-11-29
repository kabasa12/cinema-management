const membersDal = require('../../../dals/subscriptions/members/membersDal')

//-----------------------Members handlers-------------------------------------//
exports.getAllMembers = async (req, resp) => {
    try {
        let data = await allMembers()
        return resp.status(200).json({ 
            isSuccess: data.isSuccess,
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching all members'},
            error: err
        });
    }
}

exports.getMemberById = async (req, resp) => {
    try {
        let id = req.params.id
        let data = await memberById(id)
        return resp.status(200).json({ 
                isSuccess: data.isSuccess,
                data:data.data});
       
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - fetching member by id'},
            error: err
        });
    }
}

exports.createMember = async (req, resp) => {
    try {
        let data = await addMember(req.body)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess, 
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - creating new member'},
            error: err
        });
    }
}

exports.updateMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await changeMember(id,req.body);
        return resp.status(200).json({ 
            isSuccess: data.isSuccess, 
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - updating member'},
            error: err
        });
    }
}

exports.removeMember = async (req, resp) => {
    try {
        let id = req.params.id;
        let data = await deleteMember(id)
        return resp.status(200).json({ 
            isSuccess: data.isSuccess, 
            data:data.data});
    }
    catch (err) {
        return resp.status(500).json({
            isSuccess: false,
            data:{msg: 'Error cinemaWS - deleting member'},
            error: err
        });
    }
}

//--------------------------Db Functions-------------------------------------//

const allMembers = async () => {
    let resp = await membersDal.getAllMembers();
    return resp
}

const memberById = async (id) => {
    let resp = await membersDal.getMembereById(id);
    return resp
}

const addMember = async (memberObj) => {
    let resp = await membersDal.addMember(memberObj);
    return resp
}

const changeMember = async (id,memberObj) => {
    let resp = await membersDal.updateMember(id,memberObj);
    return resp
}

const deleteMember = async (id) => {
    let resp = await membersDal.deleteMember(id);
    return resp
}
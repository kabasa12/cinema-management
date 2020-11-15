const axios = require('axios');

//-----------------------Members handlers-------------------------------------//
exports.getAllMembers = async () => {
    let allMembers = await axios.get('http://localhost:8200/api/members');
    if(allMembers.data.isSuccess) {
        return allMembers.data
    } else return allMembers.msg
}

exports.getMembereById = async (id) => {
    let member = await axios.get('http://localhost:8200/api/members/' + id);
    if(member.data.isSuccess) {
        return member.data
    } else return member.msg
}

exports.addMember = async (memberObj) => {
    let member = await axios.post('http://localhost:8200/api/members',memberObj);
    if(member.data.isSuccess) {
        return member.data
    } else return member.msg
}

exports.updateMember = async (id,memberObj) => {
    let member = await axios.put('http://localhost:8200/api/members/' + id, memberObj);
    if(member.data.isSuccess) {
        return member.data
    } else return member.msg
}

exports.deleteMember = async (id) => {
    let member = await axios.delete('http://localhost:8200/api/members/' + id);
    if(member.data.isSuccess) {
        return member.data
    } else return member.msg
}

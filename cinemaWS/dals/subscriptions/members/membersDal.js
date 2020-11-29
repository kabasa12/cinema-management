const axios = require('axios');

//-----------------------Members handlers-------------------------------------//
exports.getAllMembers = async () => {
    let member = await axios.get('http://localhost:8200/api/members');
    return member.data
}

exports.getMembereById = async (id) => {
    let member = await axios.get('http://localhost:8200/api/members/' + id);
    return member.data
}

exports.addMember = async (memberObj) => {
    let member = await axios.post('http://localhost:8200/api/members',memberObj);
    return member.data
}

exports.updateMember = async (id,memberObj) => {
    let member = await axios.put('http://localhost:8200/api/members/' + id, memberObj);
    return member.data
}

exports.deleteMember = async (id) => {
    let member = await axios.delete('http://localhost:8200/api/members/' + id);
    return member.data
}

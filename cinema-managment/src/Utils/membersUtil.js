import axios from 'axios';

const deleteMember = async (memberId) => {
    let resp = await axios.delete(`http://localhost:8000/api/subscriptions/members/${memberId}`);
    return resp.data;
}

const updateMember = async (memberId,memberObj) => {
    let resp = await axios.put(`http://localhost:8000/api/subscriptions/members/${memberId}`,memberObj);
    return resp.data;
}

const addMember = async (memberObj) => {
    let resp = await axios.post(`http://localhost:8000/api/subscriptions/members`,memberObj);
    return resp.data
}

export default {deleteMember,updateMember,addMember}
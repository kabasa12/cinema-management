import axios from 'axios';

const loginUser = async (userName,password) => {
    let resp = await axios.post('http://localhost:8000/api/users/login',{userName,password},
    { withCredentials: true,
      credentials: 'include',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }});
    return resp.data
}

const createAccount = async (userName,password) => {
    let resp = await axios.post('http://localhost:8000/api/users/createAcc',{userName,password},
    { withCredentials: true,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }});
    return resp.data;
}

const logOutUser = async () => {
    let resp = await axios.delete('http://localhost:8000/api/users/logout/remove',
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const getUserInfo = async () => {
    let resp = await axios.get('http://localhost:8000/api/users/info/data',
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const getUsers = async () => {
    let resp = await axios.get('http://localhost:8000/api/users',
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const addUser = async (userObj) => {
    let resp = await axios.post('http://localhost:8000/api/users',userObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const updateUser = async (userId,userObj) => {
    let resp = await axios.put(`http://localhost:8000/api/users/${userId}`,userObj,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

const deleteUser = async (userId) => {
    let resp = await axios.delete(`http://localhost:8000/api/users/${userId}`,
    { withCredentials: true,
        credentials: 'include'});
    return resp.data;
}

export default {loginUser,getUsers,addUser,updateUser,
                deleteUser,logOutUser,createAccount,getUserInfo}
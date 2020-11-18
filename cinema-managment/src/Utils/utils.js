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

const getUsers = async () => {
    let resp = await axios.get('http://localhost:8000/api/users');
    return resp.data;
}

const addUser = async (userObj) => {
    let resp = await axios.post('http://localhost:8000/api/users',userObj);
    return resp.data;
}

const updateUser = async (userId,userObj) => {
    let resp = await axios.put(`http://localhost:8000/api/users/${userId}`,userObj);
    return resp.data;
}

const deleteUser = async (userId) => {
    let resp = await axios.delete(`http://localhost:8000/api/users/${userId}`);
    return resp.data;
}

export default {loginUser,getUsers,addUser,updateUser,deleteUser}
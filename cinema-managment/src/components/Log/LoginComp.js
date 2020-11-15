import React,{useContext, useState} from 'react';
import Context from '../../context/context';
import LogFormComp from '../Forms/LogFormComp';
import utils from '../../Utils/utils';

function LoginComp() {
  const [state,dispatch] = useContext(Context)
  const handleLogin = async (userName,password) => {
    let user = await utils.loginUser(userName,password)
    if(user.data._id){ //need to Set accessToken in Reducer
      dispatch({type:"LOGIN",payload:user});
    } 
  }

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
  }

  return !state.isLogin ? (
    <div>
        <LogFormComp type="Login" handleLogin={handleLogin}/>
    </div>
  ) : (
    <div>
        <LogFormComp type="Logout" handleLogout={handleLogout}/>
    </div>
  );
}

export default LoginComp;
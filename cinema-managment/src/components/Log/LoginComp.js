import React,{useContext,useState} from 'react';
import Context from '../../context/context';
import { useHistory,useLocation } from 'react-router-dom';
import LogFormComp from '../Forms/LogFormComp';
import utils from '../../Utils/utils';

function LoginComp() {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();
  const userNameProps = useLocation();

  const handleLogin = async (userName,password) => {
    let user = await utils.loginUser(userName,password)

    if(user.isSuccess){
      await dispatch({type:"LOGIN",payload:user});
      history.push("/movies");
    } else {
      if(user.data.status == 1) {
        history.push("/create",userName)
      }
    }
  }

  const handleLogout = async () => {
    let logout = await utils.logOutUser();
    if(logout.isSuccess)
      await dispatch({type:"LOGOUT"});
  }

  return !state.isLogin ? (
    <div>
        <LogFormComp type="Login" handleLogin={handleLogin} userName={userNameProps.state}/>
    </div>
  ) : (
    <div>
        <LogFormComp type="Logout" handleLogout={handleLogout}/>
    </div>
  );
}

export default LoginComp;
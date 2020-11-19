import React,{useContext} from 'react';
import Context from '../../context/context';
import { useHistory } from 'react-router-dom';
import LogFormComp from '../Forms/LogFormComp';
import utils from '../../Utils/utils';

function LoginComp() {
  const [state,dispatch] = useContext(Context)
  const history = useHistory();

  const handleLogin = async (userName,password) => {
    let user = await utils.loginUser(userName,password)
    if(user.data._id){
      await dispatch({type:"LOGIN",payload:user});
      history.push("/movies");
    } 
  }

  const handleLogout = async () => {
    let logout = await utils.logOutUser();
    if(logout.isSuccess)
      await dispatch({type:"LOGOUT"});
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
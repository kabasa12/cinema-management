import React,{useReducer} from 'react';
import Context from './context';
import totalReducer from '../reducers/totalReducer';


const ContextProvider = (props) => {

    const initialState = {
        isLogin: false,
        users:[],
        currentUser:{},
        isEditUser:false,
        editedUser:{},
        movies:[],
        currentMovie:{},
        isEditMovie:false,
        currentMember:{},
        subscriptions:[],
        isEditMember:false,
        currentSubsc:{},
        userPermissions:{}
    };
    
    const [state,dispatch] = useReducer(totalReducer,initialState)

    return(
        <Context.Provider value={[state,dispatch]}>
             {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
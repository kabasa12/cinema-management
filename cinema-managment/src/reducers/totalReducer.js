
export default (state, action) => {
    console.log(action)
    switch (action.type) {
        //-----Handle Login----------
        case 'LOGIN':
            let perm = action.payload.data.permissions.reduce((obj,item) => 
                Object.assign(obj,{[item.id]:item.value}),{});
            return {
                ...state,
                isLogin: true,
                currentUser: action.payload.data,
                userPermissions:perm
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false
            };
        case "SET_PERMISSIONS":
            return {
                ...state,
                userPermissions:action.payload
            };
        //----- Handle Forms----------
        case "FINISH_EDIT":
            if (action.payload === "user") {
                return {
                    ...state,
                    isEditUser:false
                };
            }else if (action.payload === "movie") {
                return {
                    ...state,
                    isEditMovie:false
                };
            } else {
                return {
                    ...state,
                    isEditMember:false
                };
            };
        
        //-----Handle Users----------
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            };
        case "EDIT_USER":
            return {
                ...state,
                editedUser: action.payload,
                isEditUser:true
            };
        case "ADD_USER":
            return {
                ...state, users: [...state.users, {...action.payload}]             
            };
        case "UPDATE_USER":
            let id = action.payload.id;
            let _users = [...state.users];
            let index = _users.findIndex( u => u.id == id);
            _users[index] = {...action.payload};
            return {
                ...state, users: _users             
            };
        case "DELETE_USER":
            let deleteId = action.payload;
            let deleteUsers = [...state.users];
            deleteUsers = deleteUsers.filter(u => u.id !== deleteId);

            return {
                ...state, users: deleteUsers
            }; 
        
        //-----Handle Movies----------
        case "SET_MOVIES":
            return {
                ...state,
                movies: action.payload
            };
        case "SET_CURR_MOVIE":
            return {
                ...state,
                currentMovie:action.payload
            }
        case "EDIT_MOVIE":
            return {
                ...state,
                currentMovie: action.payload,
                isEditMovie:true
            };

        //-----Handle Members----------
        case "EDIT_MEMBER":
            return {
                ...state,
                currentMember: action.payload,
                isEditMember:true
            };
     
        //-----Handle Subscriptions----------
        case "SET_SUBSCRIPTIONS":
            return {
                ...state,
                subscriptions: action.payload
            };
        case "SET_CURR_SUBSCRIPTION":
            return {
                ...state,
                currentSubsc:action.payload
            }
            
        default:
            return state;
    }
} 
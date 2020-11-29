import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Container,CssBaseline,TextField,Button,Typography,Divider} from '@material-ui/core';
import {FormControlLabel,Checkbox,Grid} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';
import utils from '../../Utils/utils';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header:{
        fontFamily:"Jolly Lodger",
        letterSpacing:10,
        paddingTop: "15px"
      },
    headerLong:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        paddingTop: "15px"
      },
    btnPrimary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.secondary.dark,
        backgroundColor:pellet.palette.primary.light,
        '&:hover' :{background:pellet.palette.primary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    },
    btnSecondary:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.default.main,
        backgroundColor:pellet.palette.secondary.light,
        '&:hover' :{background:pellet.palette.secondary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    }
}));

const UserFormComp = (props) => {
    const [state,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [inputs, setInputs] = useState({userName:"",
                                          firstName:"",
                                          lastName:"",
                                          id:"",
                                          createdDate:"",
                                          sessionTimeOut:0
                                        });
                                        
    const [checks,setChecks] = useState({viewSubscriptions:false,
                                         createSubscriptions:false,
                                         deleteSubscriptions:false,
                                         updateSubscriptions:false,
                                         viewMovies:false,
                                         createMovies:false,
                                         deleteMovies:false,
                                         updateMovies:false})
    
    
    let {userId} = useParams(); 

    useEffect(() => {
        if(!state.isLogin) 
            history.push('/');
            
        if(state.isEditUser){

            let inp = { userName:state.editedUser.userName,
                        firstName:state.editedUser.firstName,
                        lastName:state.editedUser.lastName,
                        id:userId,
                        createdDate:state.editedUser.createdDate,
                        sessionTimeOut:state.editedUser.sessionTimeOut
                        }
            let chk = {...checks};
            let perm = [...state.editedUser.permissions]
            perm.map(p =>
                chk = {...chk,[p.id]:p.value})
            
            setInputs(inp);
            setChecks(chk);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleCheckChange = (event) => {
        event.persist();
        setChecks({...checks, [event.currentTarget.name]: event.currentTarget.checked});
    }

    const returnBack = () => {
        history.push("/users");
    }

    const handleUser = async (userObj) => {

        let resp = null;
        if (state.isEditUser) {
            resp = await utils.updateUser(userId,userObj)
        } else {
            resp = await utils.addUser(userObj);
        }
        if(resp.isSuccess){
            let users = await utils.getUsers();
                if (users.data.length > 0) {
                    await dispatch({type:"SET_USERS", payload:users.data});
                }   
        }
        dispatch({type:"FINISH_EDIT",payload:"user"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        let d = new Date()
        let NewDate = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
                        .toISOString().split('T')[0];

        let creDate =  state.isEditUser ? inputs.createdDate :  NewDate;
        let permissions = []
        for(let key of Object.keys(checks)){
            if(checks[key])
                permissions.push(key) 
        } 
        let newUser = {
                        firstName:inputs.firstName,
                        lastName:inputs.lastName,
                        createdDate: creDate,
                        userName:inputs.userName,
                        sessionTimeOut:inputs.sessionTimeOut,
                        permissions:[...permissions]}

        handleUser(newUser);
        setInputs({userName:"",sessionTimeOut:0,id:"",
                   firstName:"",lastName:"",createdDate:"",
                   viewSubscriptions:"",createSubscriptions:"",
                   deleteSubscriptions:"",updateSubscriptions:"",
                   viewMovies:"", createMovies:"",deleteMovies:"",updateMovies:""});
        returnBack();           
    }

    return (
            <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" 
                            className={state.isEditUser ? classes.headerLong : classes.header}>
                    {state.isEditUser ?
                        "Edit User - " + state.editedUser.firstName + " " + state.editedUser.lastName :
                        "Add New User"
                    }
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoFocus
                        value={inputs.firstName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        id="lastName"
                        value={inputs.lastName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="userName"
                        label="User Name"
                        id="userName"
                        type="email"
                        value={inputs.userName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="sessionTimeOut"
                        label="Session TimeOut"
                        id="sessionTimeOut"
                        type="number"
                        value={inputs.sessionTimeOut}
                        onChange={handleInputChange}
                    />
                    <Divider />
                    <Typography component="h2" variant="h5">
                        Permissions
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="viewSubscriptions" 
                                        checked={checks.viewSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="View Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="createSubscriptions" 
                                        checked={checks.createSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Create Subscriptions"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="deleteSubscriptions" 
                                        checked={checks.deleteSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Delete Subscriptions" 
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="updateSubscriptions" 
                                        checked={checks.updateSubscriptions}
                                        onChange={handleCheckChange}/>}
                                label="Update Subscriptions" 
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="viewMovies" 
                                        checked={checks.viewMovies}
                                        onChange={handleCheckChange}/>}
                                label="View Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="createMovies" 
                                        checked={checks.createMovies}
                                        onChange={handleCheckChange}/>}
                                label="Create Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="deleteMovies"
                                        checked={checks.deleteMovies}
                                        onChange={handleCheckChange}/>}
                                label="Delete Movies"
                            />
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderIcon />} 
                                        checkedIcon={<BookmarkIcon />} 
                                        name="updateMovies"
                                        checked={checks.updateMovies}
                                        onChange={handleCheckChange}/>}
                                label="Update Movies"
                            />
                        </Grid>
                    </Grid>
                    
                    
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={clsx(classes.submit,classes.btnPrimary)}>
                            {state.isEditUser ? "Update": "Save"}
                    </Button>
                    <Button className={classes.btnSecondary}
                        fullWidth
                        variant="contained"
                        onClick={returnBack}>
                            Cancel
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default UserFormComp;
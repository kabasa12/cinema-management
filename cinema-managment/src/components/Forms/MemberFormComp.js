import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {  Container, CssBaseline, TextField, Button, Typography } from '@material-ui/core';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';
import membersUtil from '../../Utils/membersUtil'

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
        letterSpacing:10
      },
    headerLong:{
        fontFamily:"Jolly Lodger",
        letterSpacing:5
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

const MemberFormComp = () => {
    const [state,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [inputs, setInputs] = useState({userName:"",
                                          email:"",
                                          city:"",
                                          id:""
                                        });
                                
    let {memberId} = useParams(); 

    useEffect(() => {
        if(state.isEditMember){
            
            let inp = { userName:state.currentMember.member,
                        email:state.currentMember.email,
                        city:state.currentMember.city,
                        id:memberId
                        }
            
            setInputs(inp);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const returnBack = () => {
        history.push("/members");
    }

    const handleMember = async (memberObj) => {
        let resp = null;
        if (state.isEditMember) {
            resp = await membersUtil.updateMember(memberId,memberObj)
        } else {
            resp = await membersUtil.addMember(memberObj);
        }
        if(resp.isSuccess)
            dispatch({type:"FINISH_EDIT",payload:"member"});
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        
        let newMember = {userName:inputs.userName,
                        email:inputs.email,
                        city:inputs.city}

        handleMember(newMember);
        setInputs({userName:"",email:"",city:"",id:""});
        returnBack();           
    }

    return state.isLogin? (
            <Container component="div" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5"
                                className={state.isEditMember ? classes.headerLong : classes.header}>
                        {state.isEditMember ?
                            "Edit Member - " + inputs.name :
                            "Add New Member"
                        }
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Name"
                            name="userName"
                            autoFocus
                            value={inputs.userName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            value={inputs.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            id="city"
                            value={inputs.city}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={clsx(classes.submit,classes.btnPrimary)}>
                                {state.isEditMember ? "Update": "Save"}
                        </Button>
                        <Button className={classes.btnSecondary}
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={returnBack}>
                                Cancel
                        </Button>
                    </form>
                </div>
            </Container>    
    ) : <div></div>;
}

export default MemberFormComp;
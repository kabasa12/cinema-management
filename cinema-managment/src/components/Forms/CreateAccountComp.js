import React,{useState, useEffect} from 'react'
import utils from '../../Utils/utils';
import { useHistory,useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {  Container, CssBaseline, TextField, Button, Typography } from '@material-ui/core';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header:{
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

const CreateAccountComp = () => {
    const classes = useStyles(); 
    const history = useHistory();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");                                  
    const location = useLocation();

    useEffect(() => {
        let userNameProps = location.state; 
        if(userNameProps)
            setUserName(userNameProps)
    },[]);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCreate = async (userName,password) => {
        let user = await utils.createAccount(userName,password)
        console.log(user)
        if (user.isSuccess) {
            history.push('/',userName)
        }
      }

    const handleSubmit =(e) => {
        e.preventDefault();

        handleCreate(userName,password);
        setPassword("");
        setUserName("");
    }

    return  (
    <Container component="div" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h2" className={classes.header}>
                Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Enter new password
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    type="email"
                    autoFocus
                    value={userName}
                    onChange={handleUserNameChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={clsx(classes.submit,classes.btnPrimary)}>
                    Create Account
                </Button>
            </form>
        </div>
    </Container>
    );
}

export default CreateAccountComp;
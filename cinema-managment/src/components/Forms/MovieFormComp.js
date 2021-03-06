import React,{useState,useEffect,useContext} from 'react';
import Context from '../../context/context';
import {useParams,useHistory} from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import {Container,CssBaseline,TextField,Button,Typography } from '@material-ui/core';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';
import moviesUtil from '../../Utils/moviesUtil';

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

const MovieFormComp = () => {
    const [state,dispatch] = useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const [inputs, setInputs] = useState({name:"",
                                          image:"",
                                          premiered:"",
                                          genres:[],
                                          id:""
                                        });
                                
    let {movieId} = useParams(); 

    useEffect(() => {
        
        if(!state.isLogin) 
            history.push('/');  
            
        if(state.isEditMovie){
            
            let inp = { name:state.currentMovie.name,
                        genres:state.currentMovie.genres,
                        image:state.currentMovie.image,
                        premiered:state.currentMovie.premiered,
                        id:movieId
                        }
            
            setInputs(inp);
        }
    },[])                                     

    const handleInputChange = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const returnBack = () => {
        history.push("/movies");
    }

    const handleMovie = async (movieObj) => {
        let resp = null;
        if (state.isEditMovie) {
            resp = await moviesUtil.updateMovie(movieId,movieObj)
        } else { 
            resp = await moviesUtil.addMovie(movieObj);
        }
        if(resp.isSuccess) {
            let movies = await moviesUtil.getMovies();
            if (movies.data.length > 0) {
                await dispatch({type:"SET_MOVIES", payload:movies.data});
            } 
            dispatch({type:"FINISH_EDIT",payload:"movie"});
        }
    }

    const handleSubmit =(e) => {
        e.preventDefault();
       
        let newMovie;
        state.isEditMovie ?
        newMovie = {id:movieId,
                    name:inputs.name,
                    genres:inputs.genres,
                    premiered:inputs.premiered,
                    image:inputs.image} 
        :
        newMovie = {name:inputs.name,
                    genres:inputs.genres.split(','),
                    premiered:inputs.premiered,
                    image:inputs.image}

        handleMovie(newMovie);
        setInputs({name:"",genres:"",
                   premiered:"",image:""});
        returnBack();           
    }

return (
        <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" 
                            className={state.isEditMovie ? classes.headerLong : classes.header}>
                    {state.isEditMovie ?
                        "Edit Movie - " +  inputs.name :
                        "Add New Movie"
                    }
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={inputs.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="genres"
                        label="Genres"
                        id="genres"
                        value={inputs.genres}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="image"
                        label="Image Url"
                        id="image"
                        value={inputs.image}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="premiered"
                        label="Premiered"
                        id="premiered"
                        value={inputs.premiered}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={clsx(classes.submit,classes.btnPrimary)}>
                            {state.isEditMovie ? "Update": "Save"}
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
        
    )
}

export default MovieFormComp;
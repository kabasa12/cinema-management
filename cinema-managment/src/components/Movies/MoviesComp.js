import React,{useContext, useState,useEffect} from 'react';
import Context from '../../context/context';
import { useHistory,useParams } from 'react-router-dom';
import {CssBaseline, Button, Grid, Typography, Container, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import usePageBottom from '../../Utils/usePageBottem';
import 'fontsource-jolly-lodger/index.css';
import LazyLoad from 'react-lazyload';
import pellet from '../../Utils/pellet'
import MovieComp from './MovieComp';
import utils from '../../Utils/utils';
import './Movie.css';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  header:{
    fontFamily:"Jolly Lodger",
    letterSpacing:10
  },
  btns:{
    fontFamily:"Jolly Lodger",
    letterSpacing:5,
    color:pellet.palette.secondary.dark,
    border:`1px solid ${pellet.palette.default.main}`
  }
}));

function MoviesComp (props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();
  const [searchToggle,setSearchToggle] = useState(false);
  const [searchText,setSearchText] = useState("");
  const [searchMovies,setSearchMovies] = useState([]);
  const [topMovies,setTopMovies] = useState([]);
  const [movie_id,setMovieId] = useState("");
  const [cnt,setCnt] = useState(20);
  const isPageBottom = usePageBottom();
  const classes = useStyles();
  
  let {movieId} = useParams();

  useEffect(() => {
    
    const getMovies = async () => {
      let movies = await utils.getMovies();
      if (movies.length > 0) {
        await dispatch({type:"SET_MOVIES", payload:movies});
      }
    }

    const getMovieById = async (movieId) => {
      let movie = await utils.getMovieById(movieId);
      if (movie){
        dispatch({type:"SET_CURR_MOVIE", payload:movie});
      }
    }
    if (movieId) {
      console.log("movies subscribing by movie id")
      getMovieById(movieId); 
    } else {
      console.log("movies subscribing")
      getMovies(); 
    }

    return () => {
      if (movieId) {
        console.log("movies unsubscribing by movie id")
        getMovieById(movieId); 
      } else {
        console.log("movies unsubscribing")
        getMovies(); 
      }
    }
    
  },[movieId]);
  
  const searchToggleHandle = () => {
    setSearchToggle(true);
    let movies = state.movies.filter(m => m.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchMovies(movies);
  }

  const searchHandle = (e) => {
    setSearchText(e.target.value);
    let len = e.target.value
    if(len.length < 4) setSearchToggle(false);
  }

  const afterDeleteHandle = () => {
    setSearchToggle(false);
    setSearchText("");
  }

  const showAllMovies = () => {
    history.push("/movies");
    setSearchToggle(false);
    setSearchText("");
  }

  const addNewMovie = () => {
    dispatch({type:"FINISH_EDIT",payload:"movie"});
    history.push("/addMovie")
  }
  

  return state.isLogin? (
    <div>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" 
                        variant="h2" 
                        align="center" 
                        color="textPrimary" 
                        gutterBottom
                        className={classes.header}>
              Movies
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={6} md={8}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="searchText"
                    label="Find Movie"
                    name="searchText"
                    size="small"
                    type="search"
                    value={searchText}
                    onChange={searchHandle}
                    className={classes.btns}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={searchToggleHandle}
                    className={classes.btns}>Find</Button>
                </Grid>
                {state.userPermissions.viewMovies ?
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={showAllMovies}
                    className={classes.btns}>All Movies</Button>
                </Grid> : <Grid item xs={12} sm={6} md={4} /> }
                {state.userPermissions.createMovies ?
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={addNewMovie}
                    className={classes.btns}>Add Movie</Button>
                </Grid> : <Grid item xs={12} sm={6} md={4} /> }
              </Grid>  
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
          { 
            searchToggle ? searchMovies.map(movie => {
              return (
                  <LazyLoad key={movie._id}>
                    <MovieComp key={movie.id} movie={movie} deleteHandle={afterDeleteHandle}/>
                  </LazyLoad>
                    )
            })
            
            :[ movieId ?
                <MovieComp key={state.currentMovie._id} movie={state.currentMovie} 
                  deleteHandle={afterDeleteHandle}
                  movieId={movieId}/>
              :
              state.movies.map((movie) => {
                return (
                    <LazyLoad key={movie._id}>
                    <MovieComp key={movie._id} movie={movie} 
                                   deleteHandle={afterDeleteHandle}
                                   movieId={movieId}/>
                    </LazyLoad>
                    )
              })

            ]
           }
          </Grid>
        </Container>
      </main>
    </div>
  ) : <div></div>;
}

export default MoviesComp;
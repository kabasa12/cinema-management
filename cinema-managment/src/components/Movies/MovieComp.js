import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import {Link,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Collapse} from '@material-ui/core';
import {Button,Typography,Grid,List,ListItem,IconButton,Tooltip} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarsIcon from '@material-ui/icons/Stars';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import pellet from '../../Utils/pellet';
import subscriptionsUtil from '../../Utils/subscriptionsUtil';
import moviesUtil from '../../Utils/moviesUtil'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardMediaOne:{
    height:250
  },
  cardContent: {
    flexGrow: 1
  },
  ListItem:{
    paddingLeft:"1px",
    fontSize:"13px"
  }
}));

function  MovieComp (props) {
  const [state,dispatch] = useContext(Context);
  const [_genres,set_Genres] = useState("");
  const [subs,setSeubs] = useState([]);
  const [movie_id,setMovieId] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  
  useEffect(()=> {
    setMovieId(props.movie._id);
  },[]);

  useEffect(() => {
    let tmp="";
    tmp = props.movie.genres?.join();
    set_Genres(tmp);
  },[movie_id])
  
  const handleExpandClick = () => {
    const getSubs = async () => {
      let subs = await subscriptionsUtil.getMovieSubsc(props.movie._id)
      if(subs.length > 0)
          setSeubs(subs)
    }
    if(!expanded) {
      getSubs()
    }
    setExpanded(!expanded);
    
  };

  const deleteMovie = async () => {
    let deleteMovie;
    let subscriptionId = await subscriptionsUtil.getSubscriptionByMovieId(movie_id);
      if(subscriptionId.isSuccess) {
        subscriptionId.data.map( async subscribe => {
          let movies = subscribe.movies.filter(movie => movie.movieId !== movie_id)
          let subscribeObj = {_id:subscribe._id,
                              memberId:subscribe.memberId,
                              movies:movies}

          let updateSubs = await subscriptionsUtil.updateSubscription(subscribe._id,subscribeObj);
          if (updateSubs.isSuccess) {
            deleteMovie = await moviesUtil.deleteMovie(movie_id)
            if(deleteMovie.isSuccess){
              props.deleteHandle();
              let updatedMovie = state.movies.filter(movie => movie._id != movie_id)
              await dispatch({type:"SET_MOVIES", payload:updatedMovie});
            } else {
              console.log(deleteMovie.data.msg);
              props.deleteHandle();
            }  
          } else {
            console.log(updateSubs.data.msg);
            props.deleteHandle();
          }
        })  
      } else {
        deleteMovie = await moviesUtil.deleteMovie(movie_id)
        if(deleteMovie.isSuccess){
          props.deleteHandle();
          let updatedMovie = state.movies.filter(movie => movie._id != movie_id)
          await dispatch({type:"SET_MOVIES", payload:updatedMovie});
        } else {
          console.log(deleteMovie.data.msg);
          props.deleteHandle();
        }  
      }
  }

  const showEditMovieForm = () => {
    dispatch({type:"EDIT_MOVIE" ,payload:props.movie});
    history.push(`/updateMovie/${movie_id}`);
  }

  const goBack = () => {
    history.push("/members");
  }

  let oneMovie = props.movieId ? "oneMovie" : "";
  let media = props.movieId ? classes.cardMediaOne:classes.cardMedia;
  return state.userPermissions.viewMovies ? (
      <Grid className={oneMovie}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={media}
              image={props.movie.image}
              alt={props.movie.name}
              title={props.movie.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h6">
                {props.movie.name}
              </Typography>
              <Typography variant="body2" component="h2">
                Premiered - {props.movie.premiered}
              </Typography>
              <Typography variant="body2" component="h2">
                Geners
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {_genres}
              </Typography>
            </CardContent>
          </CardActionArea>
          {props.movieId ?
          <CardActions disableSpacing>
            <Button size="small" color="secondary" onClick={goBack}>
              Back To Subscriptions
            </Button>
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          :
          <CardActions disableSpacing>
            {state.userPermissions.updateMovies ?
            <Tooltip title="Edit Movie">
              <IconButton aria-label="Edit Movie" onClick={showEditMovieForm}>
                <EditIcon />
              </IconButton>
            </Tooltip> : '' }
            {state.userPermissions.deleteMovies ?
            <Tooltip title="Delete Movie">
              <IconButton aria-label="Delete Movie" onClick={deleteMovie}>
                <DeleteIcon style={{color:`${red[600]}`}}/>
              </IconButton>
            </Tooltip> : '' }
            <Tooltip title="Show Subscriptions">
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
              </IconButton>
            </Tooltip>
          </CardActions>
          }
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContent}>
              <Typography variant="body2" component="h2">Subscribers Watched</Typography>
              <List>
                { 
                  subs.map(sub => {
                    return (<ListItem className={classes.ListItem} key={sub._id}>
                      <StarsIcon style={{fontSize:"1rem"}}/>
                      <Link style={{fontSize:"12px"}} to={`/members/${sub.memberId}`}>{sub.member}</Link>
                      <Typography style={{fontSize:"1vw" , margin:"auto"}}>
                        {sub.watchDate}
                      </Typography></ListItem>)
                  })
                }
              </List>
            </CardContent>
          </Collapse>
      </Card> 
    </Grid>  
  ) : <div>
        <Grid container>
            <Button size="small" color="secondary" onClick={goBack}>
                    Back To Subscriptions
            </Button>
        </Grid>
      </div>;
}

export default MovieComp;

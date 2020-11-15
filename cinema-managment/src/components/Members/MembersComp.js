import React,{useContext,useState,useEffect} from 'react';
import Context from '../../context/context';
import { useHistory,useParams } from 'react-router-dom';
import {CssBaseline, Button, Grid, Typography, Container, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MembComp from './MembComp';
import 'fontsource-jolly-lodger/index.css';
import pellet from '../../Utils/pellet';
import axios from 'axios'
import utils from '../../Utils/utils';

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

function MembersComp (props) {
  const [state,dispatch] = useContext(Context);
  const history = useHistory();
  const [momber_id,setMemberId] = useState("");
  const [currMembers,setCurrMembers] = useState([]);
  const classes = useStyles();
  
  let {memberId} = useParams();

  useEffect(() => {
    
    const getAllSubscriptions = async () => {
      let subscriptions = await utils.getSubscriptions()
      if (subscriptions.length > 0) {
        dispatch({type:"SET_SUBSCRIPTIONS", payload:subscriptions});
      }
    }

    const getSubscriptionByMember = async (memberId) => {
      let suscriptionMember = await utils.getSubscriptionByMemberId(memberId)
      if (suscriptionMember) {
        dispatch({type:"SET_CURR_SUBSCRIPTION", payload:suscriptionMember});
      }
    }

    if(memberId){
      console.log("members subscribing by member id")
      getSubscriptionByMember(memberId); 
    } else {
      console.log("members subscribing")
      getAllSubscriptions(); 
    }

    return () => {
      if(memberId){
        console.log("members unsubscribing by member id")
        getSubscriptionByMember(memberId); 
      } else {
        console.log("members unsubscribing")
        getAllSubscriptions(); 
      }
    }
    
  },[memberId])

  const showAllMembers = () => {
    history.push("/members");
  }

  const addNewMember = () => {
    dispatch({type:"FINISH_EDIT",payload:"member"});
    history.push("/addMember")
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
                  Subscriptions
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    {state.userPermissions.viewSubscriptions ?
                    <Grid item xs={12} sm={6} md={4}>
                      <Button className={classes.btns}
                        variant="outlined" 
                        color="primary"
                        onClick={showAllMembers}>All Members</Button>
                    </Grid> : <Grid item xs={12} sm={6} md={4} /> }
                    {state.userPermissions.createSubscriptions ?
                    <Grid item xs={12} sm={6} md={4}>
                      <Button className={classes.btns}
                        variant="outlined" 
                        color="primary"
                        onClick={addNewMember}>Add Member</Button>
                    </Grid> : <Grid item xs={12} sm={6} md={4} /> }
                  </Grid>  
                </div>
              </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4} justify="center">
              { memberId ? 
                  <MembComp key={state.currentSubsc._id} member={state.currentSubsc} 
                    memberId={memberId}/>
              :
                state.subscriptions.map(member => {
                  return (<MembComp key={member._id} member={member} 
                                     memberId={memberId}/>)
                })
                
              }
              </Grid>
            </Container>
          </main>
    </div>
  ): <div></div>;
}

export default MembersComp;
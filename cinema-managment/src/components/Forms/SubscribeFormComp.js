import React,{useContext,useState} from 'react';
import Context from '../../context/context';
import { makeStyles } from '@material-ui/core/styles';
import {Container, CssBaseline,TextField,Button,Typography } from '@material-ui/core';
import {Select,MenuItem,FormHelperText} from '@material-ui/core';
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
    formControl: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button:{marginTop: theme.spacing(2)},
    header:{
      fontFamily:"Jolly Lodger",
      letterSpacing:10
    },
    btnPrimary:{ 
        marginTop: theme.spacing(2),
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.secondary.dark,
        backgroundColor:pellet.palette.primary.light,
        '&:hover' :{background:pellet.palette.primary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    },
    btnSecondary:{
        marginTop: theme.spacing(2),
        fontFamily:"Jolly Lodger",
        letterSpacing:5,
        color:pellet.palette.default.main,
        backgroundColor:pellet.palette.secondary.light,
        '&:hover' :{background:pellet.palette.secondary.dark},
        border:`1px solid ${pellet.palette.default.main}`
    }
}));

function SubscribeFormComp(props) {
  const [state] = useContext(Context);
  const classes = useStyles();
  const [movieSelect,setMovieSelect] = useState(0);
  const [watch,setWatch] = useState("01/01/1980");

  const handleCancel = () => {
    props.handleCancel();
  }

  const handleSubsc = async () => {
    let data = null;
    let d = new Date(watch)
    let watchDate = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
                        .toISOString().split('T')[0];

    let subscription = await utils.getSubscriptionByMemberId(props.memberId);
    if(subscription.isSuccess) {
      data = {...subscription.data,
                  movies:[...subscription.data.movies,{movieId:movieSelect,watchDate:watchDate}]}
                  
      let updateSubscription = await utils.updateSubscription(subscription.data._id,data);
      if (!updateSubscription.isSuccess) {
        console.log(updateSubscription.data.mag)
      }
    } else {
      data = {memberId:props.memberId,movies:{movieId:movieSelect,watchDate:watchDate}}
      let addSubscription = await utils.addSubscription(data);
      if (!addSubscription.isSuccess) {
        console.log(addSubscription.data.mag)
      }
    }
    handleCancel();
  }

  return state.isLogin? (
          <Container component="div" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h2" variant="h5" className={classes.header}>Add New Movie</Typography>
              <Select fullWidth
                value={movieSelect}
                onChange={e => setMovieSelect(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="" disabled>
                  Choose Movie ...
                </MenuItem>
                {props.userMovies.map(m => {
                  return <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>
                })}
              </Select>
              <FormHelperText>Choose Movie ...</FormHelperText>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="watchDate"
                name="watchDate"
                type="date"
                value={watch}
                onChange={e => setWatch(e.target.value)} />
              <Button
                  className={classes.btnPrimary}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubsc}>
                      Subscribe
              </Button>
              <Button className={classes.btnSecondary}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}>
                      Cancel
              </Button>
            </div>
          </Container>
  ) : <div></div>;
}

export default SubscribeFormComp;
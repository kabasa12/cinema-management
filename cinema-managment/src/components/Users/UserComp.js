import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/context';

import admin from '../../assets/images/admin.jpg';
import user from '../../assets/images/user.jpg';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card,CardHeader,CardMedia,CardContent,CardActions} from '@material-ui/core';
import {Avatar,IconButton,Typography,Collapse,Grid,Tooltip} from '@material-ui/core';
import { red} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import pellet from '../../Utils/pellet';
import utils from '../../Utils/utils';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 200,
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
  avatar: {
    backgroundColor: red[600],
  },
  cardHeader:{
    backgroundColor:pellet.palette.primary.light,
    color:pellet.palette.default.main
  },
  cardContent:{
    backgroundColor:pellet.palette.default.main,
    color:"fff"
  }
}));

function UserComp(props) {
  const [state,dispatch] = useContext(Context)
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {_id} = props.user;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showEditUserForm = () => {
    dispatch({type:"EDIT_USER" ,payload:props.user});
    history.push(`/updateUser/${_id}`)
  }

  const deleteUser = async () => {
      let deleteUserById = await utils.deleteUser(_id);
      console.log(deleteUserById)
      if(deleteUserById.isSuccess){
          let users = state.users.filter(u => u._id !== _id);
          await dispatch({type:"SET_USERS", payload:users});
      } else console.log(deleteUserById.data.msg);
  }

  let permissions = "";
  let keys = props.user.permissions.filter(p => p.value === true);
  keys.map((perm,index) => {
    return permissions += perm.name + (index < keys.length-1 ? ", " : "")
  })

  
  return (
          <Grid item xs={12} sm={6} md={10}>
            <Card className={classes.root}>
              <CardHeader className={classes.cardHeader}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {props.user.isAdmin? "A" : "U"}
                  </Avatar>
                }
                title={props.user.firstName + " " + props.user.lastName}
                subheader={props.user.createdDate}
              />
              <CardMedia
                className={classes.media}
                image= {props.user.isAdmin? admin : user}
                title={props.user.isAdmin? "admin" : "user"}
              />
              <CardContent>
                <Typography variant="body2"  component="h2">
                    User Email : <Typography variant="body2" color="textSecondary" component="p">
                                    {props.user.userName}
                                 </Typography> 
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {!props.user.isAdmin? 
                <Tooltip title="Edit User">
                  <IconButton aria-label="Edit User" onClick={showEditUserForm}>
                    <EditIcon />
                  </IconButton>
                </Tooltip> : ''
                }
                {!props.user.isAdmin? 
                <Tooltip title="Delete User">
                  <IconButton aria-label="Delete User" onClick={deleteUser}>
                    <DeleteIcon style={{color:`${red[600]}`}}/>
                  </IconButton>
                </Tooltip> : ''
                }
                <Tooltip title="Show Permissions">
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon style={{color:`${pellet.palette.default.main}`}}/>
                  </IconButton>
                </Tooltip>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Permissions</Typography>
                  <Typography paragraph color="textSecondary">
                    {permissions}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
  );
}

export default UserComp;
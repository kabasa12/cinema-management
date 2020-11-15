const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var app = express();
require('./config/database');

let usersRoute = require('./routes/users/usersRoute');
let subscriptionsRoute = require('./routes/subscriptions/subscriptionsRoute');

/*Cors Config When Production*/
app.use(cors({origin: 'http://localhost:3500', credentials: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3500');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/api/users',usersRoute);
app.use('/api/subscriptions',subscriptionsRoute);

app.listen(8000,() => console.log("cinemaWS port 8000"));
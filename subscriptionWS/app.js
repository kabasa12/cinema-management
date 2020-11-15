const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var app = express();
require('./config/database');

let membersRoute = require('./routes/members/membersRoute');
let moviesRoute = require('./routes/movies/moviesRoute');
let subscriptionsRoute = require('./routes/subscriptions/subscriptionsRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/loadData',require('./routes/loadDataRoute'));
app.use('/api/members',membersRoute);
app.use('/api/movies',moviesRoute);
app.use('/api/subscriptions',subscriptionsRoute);

app.listen(8200,() => console.log("subscriptionWS port 8200"));
const mongoose = require('mongoose')

//Connection string
mongoose.connect('mongodb://127.0.0.1:27017/subscriptionDB',
        {useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true ,
        useFindAndModify:false})


console.log('subscriptionDB connected')
